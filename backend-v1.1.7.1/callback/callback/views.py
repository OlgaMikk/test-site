from rest_framework import generics

from callback import serializers
from callback.models import Callback


class CallbackCreateView(generics.CreateAPIView):
    queryset = Callback.objects.all()
    serializer_class = serializers.CallbackSerializer
