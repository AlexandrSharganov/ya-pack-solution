from django.urls import path
from .views import login_view, worktable_view

app_name = 'users'

urlpatterns = [
    path('login/', login_view, name='login'),
    path('worktable/<str:packer_num>/', worktable_view, name='worktable'),
]
