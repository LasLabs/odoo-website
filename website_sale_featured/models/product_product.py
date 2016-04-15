# -*- coding: utf-8 -*-
# © 2015 LasLabs Inc.
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from openerp import models, fields


class ProductProduct(models.Model):
    _inherit = 'product.product'
    is_featured = fields.Boolean(
        default=False,
        required=True,
        select=True,
    )
