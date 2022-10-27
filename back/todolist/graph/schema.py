from datetime import date, datetime
import graphene

from todo.models import ToDo
from graphene_django import DjangoObjectType


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class ToDoQuery(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)

    def resolve_all_todo(root, info):
        return ToDo.objects.all()


class TodoAddMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        isComplete = graphene.Boolean()
        datetime = graphene.DateTime()

    code = graphene.String()
    msg = graphene.String()

    @classmethod
    def mutate(cls, root, info, title, datetime=None, isComplete=False):
        try:
            ToDo.objects.create(
                title=title, datetime=datetime, isComplete=isComplete)
            return TodoAddMutation(code='success', msg='')
        except Exception as e:
            return TodoAddMutation(code='wrong_value', msg=str(e))


class TodoUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)
        isComplete = graphene.Boolean()
        datetime = graphene.DateTime()

    code = graphene.String()
    msg = graphene.String()

    @classmethod
    def mutate(cls, root, info, id, title, isComplete, datetime=None):
        try:
            todo = ToDo.objects.get(id=id)
            todo.title = title
            todo.datetime = datetime
            todo.isComplete = isComplete
            todo.save()
            return TodoUpdateMutation(code='success', msg='')
        except Exception as e:
            return TodoUpdateMutation(code='wrong_value', msg=str(e))


class TodoDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    code = graphene.String()
    msg = graphene.String()

    @classmethod
    def mutate(cls, root, info, id):
        try:
            todo = ToDo.objects.get(id=id)
            todo.delete()
            return TodoDeleteMutation(code='success', msg='')
        except Exception as e:
            return TodoDeleteMutation(code='wrong_value', msg=str(e))


class Mutation(graphene.ObjectType):
    add_todo = TodoAddMutation.Field()
    update_todo = TodoUpdateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()


class Query(
        ToDoQuery,
        graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
