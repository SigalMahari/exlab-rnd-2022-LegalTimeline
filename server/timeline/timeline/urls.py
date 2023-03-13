"""timeline URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.contrib import admin
from django.urls import path

api_cases_prefix = 'api/cases'
api_events_prefix = 'api/events'
api_doc_prefix = 'api/docs'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{api_cases_prefix}/add', views.add_case),
    path(f'{api_cases_prefix}/get/<int:caseid>', views.get_case),
    path(f'{api_cases_prefix}/get', views.get_all_cases),
    path(f'{api_events_prefix}/add', views.add_event),
    path(f'{api_events_prefix}/get/<int:eventid>', views.get_event),
    path(f'{api_events_prefix}/get', views.get_all_events),
    path(f'{api_events_prefix}/getEvents/<int:caseNumber>', views.get_case_events),
    path(f'{api_doc_prefix}/get/<int:eventId>', views.get_docs),
    path(f'{api_doc_prefix}/add', views.add_doc),
    path(f'{api_doc_prefix}/open', views.open_doc),
    path(f'{api_doc_prefix}/remove', views.remove_doc),
]
