import time
from django.shortcuts import get_object_or_404, get_list_or_404

from .serializers import DiaryMusicSerializer, DiarySerializer, BookmarkSerializer, ImageSerializer
from .models import Bookmark, Diary, DiaryMusic, Image

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view
# from drf_yasg.utils import openapi, swagger_auto_schema

import base64
from Crypto import Random
from Crypto.Cipher import AES
import hashlib
from django.conf import settings


class AESCipher:
    def __init__(self):
        self.key = bytes(hashlib.sha256(settings.SECRET_KEY.encode('utf-8')).digest())
        self.BS = 16
        self.pad = lambda s: s + (self.BS - len(s.encode('utf-8')) % self.BS) * chr(self.BS - len(s.encode('utf-8')) % self.BS)
        self.unpad = lambda s : s[:-ord(s[len(s)-1:])]

    def encrypt(self, raw):
        # raw 데이터 패딩
        raw = self.pad(raw).encode('utf-8')
        # print(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self.unpad(cipher.decrypt(enc[16:]))

    def encrypt_str(self, raw):
        return self.encrypt(raw).decode('utf-8')

    def decrypt_str(self, enc):
        if type(enc)==str:
            enc = str.encode(enc)
        return self.decrypt(enc).decode('utf-8')


def make_pass():
    timekey = int(time.time())
    return str(timekey)


# Get: 다이어리 목록 반환
# Post: 다이어리 작성
class DiaryList(GenericAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    ciper = AESCipher()

    def get(self, request, format=None):
        diaries = get_list_or_404(Diary, user=request.user.pk)
        for diary in diaries:
            diary.title = self.ciper.decrypt_str(diary.title)
            diary.content = self.ciper.decrypt_str(diary.content)
            diary.emotion = self.ciper.decrypt_str(diary.emotion)
            # print('>>>>get diary:', diary.title)

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @swagger_auto_schema(
    #     request_body=DiarySerializer,
    #     manual_parameters=[openapi.Parameter('image list', openapi.BODY, description="a header for  test", type=openapi.TYPE_STRING)]
    # )
    def post(self, request, format=None):
        newPost = dict()
        newPost['user'] = request.user.pk
        newPost['title'] = self.ciper.encrypt_str(request.data['title'])
        newPost['content'] = self.ciper.encrypt_str(request.data['content'])
        newPost['emotion'] = self.ciper.encrypt_str(request.data['emotion'])
        serializer = DiarySerializer(data=newPost)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get: 일기 상세보기
# Put: 일기 수정
# Delete: 일기 삭제
class DiaryDetail(GenericAPIView):
    serializer_class = DiarySerializer
    ciper = AESCipher()

    def get(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        diary.title = self.ciper.decrypt_str(diary.title)
        diary.content = self.ciper.decrypt_str(diary.content)
        diary.emotion = self.ciper.decrypt_str(diary.emotion)
        serializer = DiarySerializer(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        newPost = dict()       
        newPost['title'] = self.ciper.encrypt_str(request.data['title'])
        newPost['content'] = self.ciper.encrypt_str(request.data['content'])
        newPost['emotion'] = self.ciper.encrypt_str(request.data['emotion'])
        
        serializer = DiarySerializer(diary, data=newPost)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, diary_pk, format=None):
        diary = get_object_or_404(Diary, pk=diary_pk)
        diary.delete()
        data = {'delete': f'데이터 {diary_pk}번이 삭제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 일기별 플레이리스트 조회
# Post: 일기별 플레이리스트 생성
@api_view(['GET', 'POST'])
def DiaryMusicDetail(request, diary_pk):
    if request.method == 'GET':
        playlist = get_list_or_404(DiaryMusic, diary=diary_pk)
        serializer = DiaryMusicSerializer(playlist, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        diary = get_object_or_404(Diary, pk=diary_pk)

        ciper = AESCipher()
        emotion = ciper.decrypt_str(diary.emotion)
        playlist = stub(emotion)

        data={'diary': diary_pk, 'music': ''}
        for music in playlist:
            data['music'] = music
            serializer = DiaryMusicSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                
        return Response(playlist, status=status.HTTP_201_CREATED)


def stub(emotion):
    # Todo: diary_pk 일기의 추천 음악 id를 list로 반환
    if emotion=='happy':
        list = [1, 2]
    elif emotion=='sad':
        list = [6, 8]
    else:
        list = [10, 11]
    return list


# Get: 책갈피 모아보기
# Post: 책갈피 생성
class BookmarkList(GenericAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get(self, request, format=None):
        bookmark = get_list_or_404(Bookmark, user=request.user.pk)
        serializer = BookmarkSerializer(bookmark, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            bookmark = Bookmark.objects.get(user=request.user.pk, diary=request.data['diary'])
            print(bookmark)
        except:
            data = request.data
            data['user'] = request.user.pk
            serializer = BookmarkSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        if bookmark != None:
            print(bookmark)
            data = {'post': '이미 책갈피로 등록된 게시물입니다.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


# Delete: 북마크 삭제
class BookmarkDetail(GenericAPIView):
    queryset = Bookmark.objects.all()

    def delete(self, request, bookmark_pk, format=None):
        bookmark = get_object_or_404(Bookmark, pk=bookmark_pk)
        bookmark.delete()
        data = {'delete': f'데이터 {bookmark_pk}번이 삭제되었습니다.'}
        return Response(data, status=status.HTTP_204_NO_CONTENT)


# Get: 월별 일기 감정 조회
@api_view(['GET'])
def monthEmotion(request, month):
    # int형 month를 두자리 string형으로 변환
    str_month = str(month)
    if len(str_month) == 1:
        str_month = '0'+str_month

    ciper = AESCipher()
    emotions = Diary.objects.values_list('emotion', flat=True).filter(created_at__month=str_month)

    for emotion in emotions:
        emotion = ciper.decrypt_str(emotion)

    data = {'emotions': emotions}
    return Response(data, status=status.HTTP_200_OK)


# Get: 월별 일기 모아보기
@api_view(['GET'])
def monthDiary(request, month):
    # int형 month를 두자리 string형으로 변환
    str_month = str(month)
    if len(str_month) == 1:
        str_month = '0'+str_month

    diaries = Diary.objects.filter(created_at__month=str_month)

    ciper = AESCipher()
    for diary in diaries:
        diary.title = ciper.decrypt_str(diary.title)
        diary.content = ciper.decrypt_str(diary.content)
        diary.emotion = ciper.decrypt_str(diary.emotion)

    serializer = DiarySerializer(diaries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# # Get: 일기별 이미지 조회
# class ImageView(GenericAPIView):
#     serializer_class = ImageSerializer

#     def get(self, request, diary_pk, format=None):
#         images = get_list_or_404(Image, pk=diary_pk)
#         serializer = ImageSerializer(images, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request, diary_pk, format=None):
#         serializer = ImageSerializer(data=request.data)
#         if(serializer.is_valid(raise_exception=True)):
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#     def put(self, request, diary_pk, format=None):
#         images = get_list_or_404(Image, pk=diary_pk)
#         serializer = ImageSerializer(images, data=request.data)
#         if(serializer.is_valid(raise_exception=True)):
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


#################################
# Get: 일기별 스티커 조회
# @api_view(['GET'])
# def monthSticker():
#     pass
#################################


#################################
# # Post: 스티커 부착
# @api_view(['POST'])
# def decorate():
#     pass
#################################
