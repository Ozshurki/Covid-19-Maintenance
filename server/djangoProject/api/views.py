from django.shortcuts import render
from rest_framework import generics, status
from .serializers import CitizensSerializer, CreateCitizenSerializer
from .models import Citizens
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime as dt


# Create your views here.
class CitizensView(generics.ListAPIView):
    queryset = Citizens.objects.all()
    serializer_class = CitizensSerializer


class CitizensAPIView(APIView):

    def get(self, request, *args, **kwargs):

        queryset = Citizens.objects.all()

        # Custom filters params

        # Extract city param
        wanted_city = self.request.query_params.get('city')

        if wanted_city == "null":
            wanted_city = None

        queryset = queryset.all()

        if wanted_city is not None:
            queryset = queryset.filter(city=wanted_city)

        # Extract date range params
        from_date = self.request.query_params.get('from-date')
        to_date = self.request.query_params.get('to-date')

        if from_date and to_date:
            # Convert string to date

            from_date = dt.strptime(from_date, '%Y-%m-%d').date()
            to_date = dt.strptime(to_date, '%Y-%m-%d').date()

            print(from_date)
            print(to_date)
            print(wanted_city)

            if wanted_city is not None:
                print("in if")
                queryset = queryset.raw('SELECT * FROM api_citizens WHERE birth_date BETWEEN %s AND %s AND city=%s',
                                        [from_date, to_date, wanted_city])
            else:
                print("in else")
                queryset = queryset.raw('SELECT * FROM api_citizens WHERE birth_date BETWEEN %s AND %s',
                                        [from_date, to_date])

        return Response(CitizensSerializer(queryset, many=True).data, status=status.HTTP_200_OK)


class CreateCitizenView(APIView):
    serializer_class = CreateCitizenSerializer

    def post(self, request, format=None):
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        birth_date = request.data.get('birthDate')
        address = request.data.get('address')
        city = request.data.get('city')
        zipcode = request.data.get('zipcode')
        land_line = request.data.get('landLine')
        cellular = request.data.get('cellular')
        is_infected = request.data.get('isInfected')
        conditions = request.data.get('conditions')

        # Valid that citizen is not exists
        queryset = Citizens.objects.filter(first_name=first_name)

        # If exists => update his record
        if queryset.exists():
            citizen = queryset[0]
            citizen.first_name = first_name
            citizen.last_name = last_name
            citizen.birth_date = birth_date
            citizen.address = address
            citizen.city = city
            citizen.zipcode = zipcode
            citizen.land_line = land_line
            citizen.cellular = cellular
            citizen.is_infected = is_infected
            citizen.conditions = conditions
            citizen.save(update_fields=['first_name', 'last_name', 'birth_date', 'address',
                                        'city', 'zipcode', 'land_line', 'cellular',
                                        'is_infected', 'conditions'])
        # Else, save the new citizen
        else:
            citizen = Citizens(first_name=first_name, last_name=last_name, birth_date=birth_date, address=address,
                               city=city, zipcode=zipcode, land_line=land_line, cellular=cellular,
                               is_infected=is_infected, conditions=conditions)
            citizen.save()

            return Response(CitizensSerializer(citizen).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteCitizenView(APIView):
    serializer_class = CreateCitizenSerializer

    def delete(self, request, *args, **kwargs):
        first_name = self.kwargs['first_name']

        if first_name is not None:
            Citizens.objects.get(first_name=first_name).delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
