pragma solidity >=0.4.22 <0.6.0;

contract OpenBS {
    
    uint public actionIndex = 0;
    struct Action {
        uint id;
        address fromUser;
        address toUser;
        string action;
        string description;
    }
    mapping(uint => Action) stores;

    event NewAction(address _fromUser, address _toUser, string _action, string _description);

    constructor() public {
    }

    function addNewAction (address _fromUser, address _toUser, string memory _action, string memory _description) public {
        actionIndex += 1;
        Action memory action = Action(actionIndex, _fromUser,
        _toUser, _action, _description);
        stores[actionIndex] = action;
        emit NewAction(_fromUser, _toUser, _action, _description);
    }
    
    function getAction (uint _actionIndex) view public
    returns(uint, address, address, string memory, string memory) {
        Action memory action = stores[_actionIndex];
        return (action.id, action.fromUser, action.toUser, action.action, action.description);
    }
}