.. image:: https://img.shields.io/badge/license-AGPL--3-blue.svg
   :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
   :alt: License: AGPL-3

=============================
Website Snippet - Data Slider
=============================

Adds a SlickJS slider building block to website for abstract datasets,
assuming proper user permissions.

Usage
=====

To use this module, you need to:

* Install `website_snippet_data_slider` module
* Drop `Data Slider` building block anywhere on your site
* Edit the configuration options to your liking
* Save
* Profit!


Note that the snippet defaults to the `product.template` model, as most common
usage for this widget is likely a product carousel.

Odoo snippet settings Javascript somewhat of got in the way when it came to allowing
easy choice of the data, aside from the simple options that were provided in the UI.

In order to further customize your snippet, go into HTML view and edit the
`data-options` attribute of the `section` element that serves as the snippet root.

Following are the setings that do not have configuration in the UI:

* `data_model` - Model name
* `data_domain` - Search domain for data
* `data_limit` - Limit query to this many results
* `data_image_field` - Field name to use for image
* `data_name_field` - Field to use for display name
* `data_title` - Text to use as main snippet header
* `data_title_tag` - HTML element type to use for title element (such as `h1`)
* `data_title_class` - Class to use for the title element
* `data_uri_prefix` - Path prefix for link. Record id will be added to it in context.
* `data_container_width` - Width of the outer container, default 90%
* `prevArrow` & `nextArrow` - HTML or jQuery selector of slider arrows

Known Issues / Road Map
======================

* Provide UI for data settings
* Provide responsive settings & config
* Consolidate the data options a bit?
* Find a way to use slug, instead of URI Prefix
* Touch up the stylesheets
* Add a real thumbnail, instead of icon

Credits
=======

Images
------

* LasLabs: `Icon <https://repo.laslabs.com/projects/TEM/repos/odoo-module_template/browse/module_name/static/description/icon.svg?raw>`_.

Contributors
------------

* Dave Lasley <dave@laslabs.com>

Maintainer
----------

.. image:: https://laslabs.com/logo.png
   :alt: LasLabs Inc.
   :target: https://laslabs.com

This module is maintained by LasLabs Inc.
