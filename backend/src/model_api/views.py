import uuid
import json
import numpy as np

from django.http.response import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .model.model import new_model

__model = None  # TODO use persistent storage


@csrf_exempt
def new(request):
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['allow'] = 'OPTIONS,POST'
        return response

    if request.method == 'POST':
        global __model

        __model = new_model()
        # run the model for a while to make it stabilise
        returned_data = __model.step(50, np.zeros(__model.n_cells), np.zeros(__model.n_cells), 0)

        guid = uuid.uuid4()

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

        data = json.loads(request.body)

        harvest_effort = np.array(data['harvestEffort'])
        lower_harvest_bodymass = np.array(data['lowerHarvestBodymass'])
        timestep = data['timestep']
        warming = data['warming']

        returned_data = __model.step(timestep, harvest_effort, lower_harvest_bodymass, warming)
        return JsonResponse(returned_data)

    return HttpResponse(status=400)