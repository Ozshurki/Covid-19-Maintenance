from django.urls import path
from .views import CitizensView, CreateCitizenView, CitizensAPIView, DeleteCitizenView

urlpatterns = [
    path('citizen', CitizensAPIView.as_view()),
    path('register', CreateCitizenView.as_view()),
    path('citizens/<str:first_name>', DeleteCitizenView.as_view())
]
