"""
URL configuration for apiproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
#url의 처리를 다른 모듈에게 위임하고자 할 때 사용하는 패키지를 import
from django.urls import include
from apiapp import views

#path("example/", include("apiapp.urls")) 문장은
#example로 시작하는 요청이 오면 apiapp 애플리케이션의 urls.py 파일에 처리를 위임
urlpatterns = [
    path("admin/", admin.site.urls),
    path("example/", include("apiapp.urls")),
    path("ajax/", views.ajax)
]
# ajax/ 라는 요청이 왔을 때 apiapp.views파일의 ajax함수가 처리하도록 설정
