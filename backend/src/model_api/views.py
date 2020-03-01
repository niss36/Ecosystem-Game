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
        __model.step(50, np.zeros(__model.n_cells), np.zeros(__model.n_cells), 0)

        guid = uuid.uuid4()

        return JsonResponse({
            'guid': str(guid),
            'data': {
                'biodiversityScores': __model.compute_biodiversity_scores(),
                'harvestedBiomasses': [0] * __model.n_cells,
                'meanHarvestedBiomass': 0,
                'state': __model.return_state(),
            }
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

        harvest_effort = data['harvestEffort']
        lower_harvest_bodymass = data['lowerHarvestBodymass']
        timestep = data['timestep']  # TODO ignored
        warming = data['warming']

        r = __model.step(1, harvest_effort, lower_harvest_bodymass, warming)
        return JsonResponse(r)

    return HttpResponse(status=400)