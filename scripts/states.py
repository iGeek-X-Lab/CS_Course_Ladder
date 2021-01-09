# states.py

from state_machine import State, StateMachine, Context
from csv import reader

class MainMenu(State):
    def get_prompt(self):
        return "Welcome to iGeek CS Course Ladder Project, please choose an action: "
    
    def get_prompt_options(self):
        return {
            "batch_add": "add documents to a collection from the csv file",
            "placeholder": "some description"
        }

    def next(self, response):
        if response == "batch_add":
            return Forum.state_batch_add_documents
        else:
            print("unknown action, please only enter the word displayed inside the <brackets>")
            return self

class BatchAdd(State):
    no_prompt = True
    
    def run(self):
        print("NOTES:",
        "1. please make sure the first line of the csv file contains the key for each of the attributes",
        "and if an attribute does not exist for a document the field is still left empty(with commas inbetween)",
        "2. make sure the csv file exist in the same directory as the script itself", sep="\n")

        collection_name = self.get_input("enter the collection to perform batch add: ")
        file_name = self.get_input("Enter the csv filename: ")

        collection = self.context.db[collection_name]
        
        file = open(file_name, 'r')
        file_reader = reader(file)
        
        header = None 
        for line in reader(file):
            if header is None:
                header = line
                continue

            document = {}
            for i in range(0, len(line)):
                element = line[i]
                header_name = header[i]
                if len(element) == 0 or element.isspace(): # empty element
                    continue
                elif '[' in element and ']' in element: # array element
                    document[header_name] = [x.strip() for x in element[1:-1].split(',')]
                elif element.isnumeric(): # integer element
                    document[header_name] = int(element)
                else: # string element
                    document[header_name] = element
            collection.insert_one(document)

        print("insert successful!")

    def next_no_prompt(self):
        return Forum.state_main_menu

class Forum(StateMachine):
    def __init__(self, context):
        StateMachine.__init__(self, context, Forum.state_main_menu)

