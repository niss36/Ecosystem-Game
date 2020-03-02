import numpy as np

from django.db import models
from django.db.models import fields

from model_api.model.model import MadingleyModel


def arrays_upload_location(instance, filename):
    return f'{instance.guid}/arrays.npz'


class Game(models.Model):
    guid = fields.UUIDField(primary_key=True)

    n_cells = fields.PositiveIntegerField()
    cell_area = fields.FloatField()

    temperature = fields.FloatField(blank=True, null=True)
    months_elapsed = fields.PositiveIntegerField(blank=True, null=True)

    arrays = models.FileField(blank=True, null=True, upload_to=arrays_upload_location)


def update_game_from_model(game, model: MadingleyModel):
    game.temperature = model.temperature
    game.months_elapsed = model.months_elapsed

    game.arrays.open('wb')
    with game.arrays:
        np.savez(game.arrays, bodymasses=model.bodymasses,
                 herbivore_biomasses=model.herbivore_biomasses, herbivore_abundances=model.herbivore_abundances,
                 carnivore_biomasses=model.carnivore_biomasses, carnivore_abundances=model.carnivore_abundances,
                 primary_producer_biomass=model.primary_producer_biomass)


def get_model_from_game(game):
    game.arrays.open('rb')
    with game.arrays:
        with np.load(game.arrays) as arrays:
            return MadingleyModel(game.n_cells, game.cell_area, game.temperature, game.months_elapsed,
                                  arrays['bodymasses'],
                                  arrays['herbivore_biomasses'], arrays['herbivore_abundances'],
                                  arrays['carnivore_biomasses'], arrays['carnivore_abundances'],
                                  arrays['primary_producer_biomass'])
