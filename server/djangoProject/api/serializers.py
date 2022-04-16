from rest_framework import serializers
from .models import Citizens


class CitizensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citizens
        fields = ('id', 'first_name', 'last_name', 'birth_date', 'address',
                  'city', 'zipcode', 'land_line', 'cellular', 'is_infected', 'conditions')


# Serializer for post request
class CreateCitizenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citizens
        fields = ('first_name', 'last_name', 'birth_date', 'address',
                  'city', 'zipcode', 'land_line', 'cellular', 'is_infected', 'conditions')


class DeleteCitizenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citizens
        fields = 'first_name'
