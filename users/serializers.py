from rest_framework import serializers
from social_django.models import UserSocialAuth
from .models import User


class SocialUserSerializer(serializers.ModelSerializer):
    extra_data = serializers.SerializerMethodField()

    class Meta:
        model = UserSocialAuth
        fields = ('extra_data',)

    def get_extra_data(self, obj):
        if obj.first():
            return obj.first().extra_data
        return {}

class UserSerializer(serializers.ModelSerializer):
    social_auth = SocialUserSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'social_auth')

