from collections import OrderedDict

from rest_framework import pagination
from rest_framework.response import Response


class CustomPageNumber(pagination.PageNumberPagination):
    page_size = 15

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('current', self.page.number),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
