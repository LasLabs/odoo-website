# -*- coding: utf-8 -*-
##############################################################################
#    Copyright (C) LasLabs, Inc [https://laslabs.com]. All Rights Reserved
##############################################################################
#    Collaborators of this module:
#       Written By: Dave Lasley <dave@laslabs.com>
#       Styled By: Alex Aguilar <aaguilar@laslabs.com>
#
##############################################################################
#    This project is mantained by LasLabs Inc:
#    https://repo.laslabs.com/projects/SMD/repos/medical_pharmacy_smd/browse
#
##############################################################################
#
#    This program is not free software: you cannot redistribute it in any way
#    without prior written consent from both LasLabs Inc and Specialty Medical
#    Group, LLC. as per the terms of the Service Agreement in effect at the
#    time of the writing of this program.
#
##############################################################################
{
    'name': 'Shopping Cart Dropdown',
    'version': '8.0.0.1',
    'category': 'Website',
    'author': "LasLabs",
    'license': 'AGPL-3',
    'website': 'https://github.com/laslabs/odoo-website_sale_cart_dropdown',
    'depends': [
        'website_sale',
    ],
    'data': [
        'views/website_view.xml',
    ],
    'installable': True,
    'application': False,
}
