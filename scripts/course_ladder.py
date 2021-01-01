# required modules: pymongo, dnspython

from pymongo import MongoClient
from pymongo.errors import OperationFailure

from state_machine import State, StateMachine, Context
from states import *
import getpass as gp
import sys


# states
Forum.state_main_menu = MainMenu()
Forum.state_batch_add_documents = BatchAdd()


def main():
    if sys.version_info < (3, 6, 0):
        print("please use python version 3.6.0 or above")
        return

    username = input("Please login with your username: ")
    password = gp.getpass("Please enter your password: ")

    try:
        client = MongoClient("mongodb+srv://" + username + ":" + password + "@igeekmongodb.yefsu.mongodb.net/igeek?retryWrites=true&w=majority")
        client.admin.command('ismaster')
    except OperationFailure:
        print("incorrect authentication details, exiting program")
        return

    context = Context(client)
    app = Forum(context)

    app.start()

if __name__ == "__main__":
    main()

