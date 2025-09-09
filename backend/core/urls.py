from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, TaskViewSet, NoteViewSet, CalendarEventViewSet,
    ReportViewSet, MeetingViewSet, QuoteViewSet, dashboard_summary
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'events', CalendarEventViewSet, basename='event')
router.register(r'reports', ReportViewSet, basename='report')
router.register(r'meetings', MeetingViewSet, basename='meeting')
router.register(r'quotes', QuoteViewSet, basename='quote')

urlpatterns = [
    path('', include(router.urls)),
    path("summary/", dashboard_summary, name="dashboard-summary"),
]
