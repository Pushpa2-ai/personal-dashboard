from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only events that belong to the logged-in user
        return Event.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        # Assign the logged-in user automatically
        serializer.save(user=self.request.user)
