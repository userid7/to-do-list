from hashlib import new
from django.test import TestCase
from todo.models import ToDo


class GrapheneQueryTest(TestCase):

    def setUp(self):
        ToDo.objects.create(title="Swimming")
        super().setUp()

    def test_add_query(self):
        newItem = "Jogging"
        ToDo.objects.create(title=newItem)

        obj = ToDo.objects.all()
        self.assertEqual(2, len(obj))
        self.assertEqual("Swimming", obj[0].title)
        self.assertEqual(False, obj[0].isComplete)

        self.assertEqual(newItem, obj[1].title)
        self.assertEqual(False, obj[1].isComplete)

    def test_get_query(self):
        obj = ToDo.objects.filter(id=1).first()
        self.assertEqual("Swimming", obj.title)
        self.assertEqual(False, obj.isComplete)

    def test_delete_query(self):
        ToDo.objects.filter(id=1).delete()

        obj = ToDo.objects.all()
        self.assertEqual(0, len(obj))

    def test_update_query(self):
        obj = ToDo.objects.filter(id=1).first()
        obj.isComplete = True
        obj.save()

        obj = ToDo.objects.filter(id=1).first()
        self.assertEqual("Swimming", obj.title)
        self.assertEqual(True, obj.isComplete)
