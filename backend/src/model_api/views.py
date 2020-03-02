import uuid
import json
import numpy as np
from django.core.files.base import ContentFile

from django.http.response import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .model.model import new_model
from .models import Game, update_game_from_model, get_model_from_game

__model = None  # TODO use persistent storage


@csrf_exempt
def new(request):
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['allow'] = 'OPTIONS,POST'
        return response

    if request.method == 'POST':
        guid = uuid.uuid4()
        model = new_model()

        game = Game(guid=guid, n_cells=model.n_cells, cell_area=model.cell_area)
        game.arrays.save('', ContentFile(''))
        # run the model for a while to make it stabilise
        returned_data = model.step(48, np.zeros(model.n_cells), np.zeros(model.n_cells), 0)

        update_game_from_model(game, model)
        game.save()

        return JsonResponse({
            'guid': str(guid),
            'data': returned_data
        })

    return HttpResponse(status=400)


@csrf_exempt
def update(request, guid):
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['allow'] = 'OPTIONS,POST'
        return response

    if request.method == 'POST':

        game = Game.objects.get(guid=guid)
        model = get_model_from_game(game)

        data = json.loads(request.body)

        harvest_effort = np.array(data['harvestEffort'])
        lower_harvest_bodymass = np.array(data['lowerHarvestBodymass'])
        timestep = data['timestep']
        warming = data['warming']

        returned_data = model.step(timestep, harvest_effort, lower_harvest_bodymass, warming)

        update_game_from_model(game, model)
        game.save()

        return JsonResponse(returned_data)

    return HttpResponse(status=400)