from functools import wraps
from typing import Callable, List

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request


def check_required_query_params(query_params: List):
    def inner_wrap(f: Callable):
        @wraps(f)
        def wrap(obj, *args, **kwargs):
            view = obj

            if isinstance(obj, Request):
                view = obj.parser_context["view"]

            for query_param in query_params:
                if query_param not in view.request.query_params:
                    raise ValidationError
            return f(view, *args, **kwargs)

        return wrap

    return inner_wrap


def set_required_query_params(query_params: List, **auto_schema_kwargs):
    def inner_wrap(f: Callable):
        @wraps(f)
        @extend_schema(
            parameters=[
                OpenApiParameter(param, location=OpenApiParameter.QUERY, type=OpenApiTypes.STR, required=True)
                for param in query_params
            ],
            **auto_schema_kwargs,
        )
        @check_required_query_params(query_params)
        def wrap(obj, *args, **kwargs):
            return f(obj, *args, **kwargs)

        return wrap

    return inner_wrap


def extend_endpoint(
    queryset=None,
    serializer_class=None,
    lookup_field=None,
    lookup_url_kwarg=None,
    filter_backends=None,
    pagination_class=None,
    renderer_classes=None,
    parser_classes=None,
    authentication_classes=None,
    throttle_classes=None,
    permission_classes=None,
    content_negotiation_class=None,
    metadata_class=None,
    versioning_class=None,
    merge=False,
    **view_kwargs,
):
    def inner_wrap(f: Callable):
        @wraps(f)
        def wrap(obj, *args, **kwargs):
            attributes = {
                "queryset": queryset,
                "serializer_class": serializer_class,
                "lookup_field": lookup_field,
                "lookup_url_kwarg": lookup_url_kwarg,
                "filter_backends": filter_backends,
                "pagination_class": pagination_class,
                "renderer_classes": renderer_classes,
                "parser_classes": parser_classes,
                "throttle_classes": throttle_classes,
                "permission_classes": permission_classes,
                "content_negotiation_class": content_negotiation_class,
                "metadata_class": metadata_class,
                "versioning_class": versioning_class,
                "authentication_classes": authentication_classes,
                **view_kwargs,
            }
            view = obj

            if isinstance(obj, Request):
                view = obj.parser_context["view"]

            for attribute_key, attribute_value in attributes.items():
                if attribute_value is None:
                    continue
                if hasattr(attribute_value, "__iter__") and merge:
                    old_attribute = getattr(view, attribute_key, type(attribute_value)())
                    setattr(view, attribute_key, old_attribute + attribute_value)
                else:
                    setattr(view, attribute_key, attribute_value)
            return f(obj, *args, **kwargs)

        return wrap

    return inner_wrap


def disable_for_loaddata(signal_handler):
    @wraps(signal_handler)
    def wrapper(*args, **kwargs):
        if kwargs.get("raw"):
            return
        signal_handler(*args, **kwargs)

    return wrapper
