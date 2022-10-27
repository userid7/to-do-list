from django.test.testcases import TestCase
import graphene
from .schema import Query, Mutation
from todo.models import ToDo

GET_TODO = """
query {
    allTodo {
        id
        title
        isComplete
        datetime
    }
}
"""

ADD_TODO = """
mutation AddTodo($title: String! $isComplete: Boolean! $datetime: DateTime
                 ) {
    addTodo(title: $title, isComplete: $isComplete, datetime: $datetime) {
        code
        msg
    }
}
"""

DELETE_TODO = """
mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
        code
        msg
    }
}
"""

UPDATE_TODO = """
mutation UpdateTodo($id: Int! $title: String! $isComplete: Boolean
                    $datetime: DateTime
                    ) {
    updateTodo(
        id: $id
        title: $title
        isComplete: $isComplete
        datetime: $datetime
    ) {
        code
        msg
    }
}
"""


class GrapheneQueryTest(TestCase):

    def setUp(self):
        ToDo.objects.create(title="Swimming")
        super().setUp()

    def test_add_query(self):
        schema = graphene.Schema(query=Query, mutation=Mutation)
        result = schema.execute(ADD_TODO, variables={
                                "title": "Cooking", "isComplete": False, "datetime": None})
        self.assertIsNone(result.errors)
        obj = ToDo.objects.all()
        self.assertEqual(2, len(obj))
        self.assertEqual("Cooking", obj[1].title)
        self.assertEqual(False, obj[1].isComplete)

    def test_get_query(self):
        schema = graphene.Schema(query=Query, mutation=Mutation)
        result = schema.execute(GET_TODO)
        self.assertIsNone(result.errors)
        self.assertDictEqual({'allTodo': [
                             {'datetime': None, 'id': '1', 'isComplete': False, 'title': 'Swimming'}]}, result.data)

    def test_delete_query(self):
        schema = graphene.Schema(query=Query, mutation=Mutation)
        result = schema.execute(DELETE_TODO, variables={"id": 1})
        self.assertIsNone(result.errors)
        obj = ToDo.objects.all()
        self.assertEqual(0, len(obj))

    def test_update_query(self):
        schema = graphene.Schema(query=Query, mutation=Mutation)
        result = schema.execute(UPDATE_TODO, variables={"id": 1,
                                "title": "Cooking", "isComplete": True, "datetime": None})
        self.assertIsNone(result.errors)
        obj = ToDo.objects.all()
        self.assertEqual("Cooking", obj[0].title)
        self.assertEqual(True, obj[0].isComplete)
