import uuid
import json

from django.http.response import HttpResponse, JsonResponse

from .model.model import new_model

__model = None  # TODO use persistent storage


def new(request):
    global __model

    __model = new_model()

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


def update(request, guid):
    if request.method == 'POST':

        data = json.loads(request.body)

        harvest_effort = data['harvestEffort']
        lower_harvest_bodymass = data['lowerHarvestBodymass']
        timestep = data['timestep']  # TODO ignored
        warming = data['warming']

        r = __model.step(harvest_effort, lower_harvest_bodymass, warming)
        return JsonResponse(r)

    return HttpResponse(status=400)