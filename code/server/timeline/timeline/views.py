from rest_framework import status, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import Case, Document
from .models import Event
from django.core import serializers
from django.core.files.storage import default_storage
from django.core.files.storage import FileSystemStorage
import datetime
import os


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def add_case(request):
    data = request.data
    case_number = data['case_number']
    creation_date = data['creation_date']
    last_discussion = data['last_discussion']
    prosecutor = data['prosecutor']
    defendant = data['defendant']
    defense = data['defense']
    case_description = data['case_description']
    tags = data['tags']
    new_case = Case(case_number=case_number, creation_date=creation_date,
                    last_discussion=last_discussion, prosecutor=prosecutor, defendant=defendant,
                    defense=defense,
                    case_description=case_description, tags=tags)
    res = new_case.save()
    if res:
        return Response("could not add case", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response("case added successfully", status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_case(request, caseid):
    res = Case.objects.get(case_number=caseid)
    return Response(res.case_description, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_all_cases(request):
    cases = serializers.serialize('json', Case.objects.all())
    return Response(cases, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def add_event(request):
    data = request.data
    i = int(data['id'])
    if data['id'] != '0':
        existEvent = Event.objects.get(id=i)
        existEvent.title = data['title']
        existEvent.date = data['date']
        existEvent.hour = data['hour']
        existEvent.category = data['category']
        existEvent.case_description = data['case_description']
        existEvent.tags = data['tags']
        existEvent.icon = data['icon']
        existEvent.full_name = data['full_name']
        existEvent.phone = data['phone']
        existEvent.mail = data['mail']
        res = existEvent.save()
    else:
        event = Event(case_number=data['case_number'], title=data['title'], date=data['date'], hour=data['hour'],
                      category=data['category'], case_description=data['case_description'], tags=data['tags'],
                      icon=data['icon'], full_name=data['fullName'], phone=data['phoneNumber'], mail=data['mail'])
        res = event.save()
    if res:
        return Response("could not add event", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response("event added successfully", status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_event(request, eventid):
    try:
        res = serializers.serialize('json', Event.objects.filter(id=eventid))
        return Response(res, status=status.HTTP_200_OK)
    except TypeError:
        return Response("Wrong id", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_all_events(request):
    events = serializers.serialize('json', Event.objects.order_by('date'))
    return Response(events, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_case_events(request, caseNumber):
    events = serializers.serialize('json', Event.objects.all().filter(case_number=caseNumber).order_by('-date'))
    return Response(events, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_docs(request, eventId):
    docs = serializers.serialize('json', Document.objects.all().filter(event=eventId))
    return Response(docs, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def add_doc(request):
    data = request.data
    files = data['files']
    p = "\"" + default_storage.location + '\\' + files.name + "\""
    file_name = default_storage.save(files.name, files)
    doc = Document(name=files.name, upload_date=datetime.datetime.now(), event=data['id'], path=p)
    res = doc.save()
    if res:
        return Response("Bad", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response("Success", status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def open_doc(request):
    file = request.data
    fields = file['fields']
    os.system(fields['path'])
    return Response("Opened", status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def remove_doc(request):
    file = request.data
    dbFile = Document.objects.filter(id=file['pk'])
    if dbFile.exists():
        dbFile.delete()
        return Response("File deleted successfully ", status=status.HTTP_200_OK)
