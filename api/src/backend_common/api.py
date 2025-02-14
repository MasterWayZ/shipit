# -*- coding: utf-8 -*-
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import logging
import pathlib

from connexion import problem
from connexion.apis.flask_api import FlaskApi
from connexion.apps.flask_app import FlaskJSONEncoder
from connexion.exceptions import ProblemException
from werkzeug.exceptions import HTTPException, InternalServerError, default_exceptions

logger = logging.getLogger(__name__)


def common_error_handler(exception=None):
    """
    :type exception: Exception
    """
    if isinstance(exception, ProblemException):
        response = problem(
            status=exception.status,
            title=exception.title,
            detail=exception.detail,
            type=exception.type,
            instance=exception.instance,
            headers=exception.headers,
            ext=exception.ext,
        )
    else:
        if not isinstance(exception, HTTPException):
            exception = InternalServerError()

        response = problem(title=exception.name, detail=exception.description, status=exception.code, headers=exception.get_headers())

    return FlaskApi.get_response(response)


class Api:
    """TODO: add description
    TODO: annotate class
    """

    def __init__(self, app):
        """
        TODO: add description
        TODO: annotate function
        """
        self.__app = app

        logger.debug("Setting JSON encoder.")

        app.json_encoder = FlaskJSONEncoder

        logger.debug("Setting common error handler for all error codes.")
        # FlaskApp sets up error handler automatically, but FlaskApi doesn't.
        # We have to set them up manually.
        for error_code in default_exceptions:
            app.register_error_handler(error_code, common_error_handler)

        app.register_error_handler(ProblemException, common_error_handler)

    def register(
        self,
        specification,
        base_path=None,
        arguments=None,
        validate_responses=True,
        strict_validation=True,
        resolver=None,
        auth_all_paths=False,
        debug=False,
        resolver_error_handler=None,
        validator_map=None,
        pythonic_params=False,
        pass_context_arg_name=None,
        options=None,
    ):
        """Adds an API to the application based on a swagger file"""

        app = self.__app

        logger.debug("Adding API: %s", specification)

        self.__api = api = FlaskApi(
            specification=pathlib.Path(specification),
            base_path=base_path,
            arguments=arguments,
            validate_responses=validate_responses,
            strict_validation=strict_validation,
            resolver=resolver,
            auth_all_paths=auth_all_paths,
            debug=app.debug,
            resolver_error_handler=resolver_error_handler,
            validator_map=validator_map,
            pythonic_params=pythonic_params,
            pass_context_arg_name=pass_context_arg_name,
            options=options,
        )
        self.swagger_url = api.options.openapi_console_ui_path
        app.register_blueprint(api.blueprint)

        return api


def init_app(app):
    return Api(app)
