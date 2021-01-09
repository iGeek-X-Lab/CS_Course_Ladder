from bson.objectid import ObjectId

class Context:
    """
    the whole app context, data that needs to be shared across different states
    the instance is kept alive in the state machine.
    """
    def __init__(self, client):
        self.client = client
        self.db = client['igeek']
        self.current_database = "igeek"

    """
    helper function to get a unique id using bson.objectid
    """
    def get_new_Id(self):
        return ObjectId()

class State:
    """
    no_prompt describes whether the state need to prompt for user action on the *next* call
    """
    no_prompt = False # default to need to prompt for user input to use in next

    def init_context(self, context: Context):
        self.context = context

    """
    the main functionality of the state is performed here, such as executing queries and
    other user interactions
    """
    def run(self):
        pass
    
    """
    the transition function of the state, determine which state to goto next based on users'
    action response
    """
    def next(self, response):
        pass

    """
    the transition function alterative to the one above. called only when the state is 
    no_prompt, will replace next() in that case
    """
    def next_no_prompt(self):
        pass

    """
    the information the state should give user about their available actions/inputs,
    this can be a result of the action, too.
    to be printed out by the state machine
    """
    def get_prompt(self):
        return "Choose an action:"
    
    """
    the list of actions and their descriptions, to be printed out by the state machine
    """
    def get_prompt_options(self) -> dict:
        pass

    """
    get the input and check to ensure the input is nonempty and does not only contain spaces
    """
    def get_input(self, prompt):
        while True:
            res = input(prompt)

            if (len(res) == 0):
                print("input cannot be empty")
            elif (res.isspace()):
                print("input cannot only contain spaces")
            else:
                return res
    
    
class StateMachine:
    def __init__(self, context: Context, initial_state: State):
        self.context = context 
        self.current_state = initial_state
        self.current_state.run() # start the dumb state which does nothing

    """
    format and print the options provided by child state to users
    """
    def prompt_options(self, child_options={}):
        if child_options is not None:
            for action, description in child_options.items():
                print("    <{}>: {}".format(action, description))
        print("    <exit>: exit the program")

    """
    start the state machine loop. get next state -> run next state -> loop again
    """
    def start(self):
        while True:
            if self.current_state.no_prompt is True:
                self.current_state = self.current_state.next_no_prompt()
            else:
                print(self.current_state.get_prompt()) # print the leading prompt sentenct
                self.prompt_options(self.current_state.get_prompt_options()) # print the available options

                response = input(">>> ")
                if response == "exit":
                    break
                self.current_state = self.current_state.next(response)

            if self.current_state is None:
                break

            """
            this will give the state more information of the app progress (stored in the context)
            not needed for some state
            """
            self.current_state.init_context(self.context)

            """
            the state will do everything here:
                - ask for even more user input that's specific to this state
                - display more info

            in the end of this method they should prompt user for input,
            ask them for an action to take or press enter
            """
            self.current_state.run()


