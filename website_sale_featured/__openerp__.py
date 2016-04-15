# -*- coding: utf-8 -*-
# © 2015 LasLabs Inc.
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    'name': 'Featured Products for WebsiteSales',
    'version': '9.0.1.0.0',
    'category': 'Website',
    'author': "LasLabs",
    'license': 'AGPL-3',
    'website': 'https://laslabs.com',
    'depends': [
        'website_sale',
    ],
    'data': [
        'product_product_view.xml',
        'product_public_category_view.xml',
        'website_sale_snippet.xml',
    ],
    'installable': False,
    'application': False,
}
