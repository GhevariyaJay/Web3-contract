pragma solidity ^0.8.0

contract TokenContract{
    string public name = "HI";
    stirng public symbol = "HI";
    uint8 public decimal = 18;
    uint256 public totalSupply = 10000* (10** uint256(decimals));

    mcpping(address => uint256) public balanceOf;
    mcapping(address=> mapping(address=> uint256)) public allownace;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    construct(){
        balanceOf[msg.sender] = totalSupply;
    }
    function Transfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value, "Not enough balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
        
    }

    function approve(address _sender, uint256 _value)public returns(bool success){
        allownace[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
       
    }

    function transferFrom(address _from, address _to, uint256 _value)public return (bool success){
        require(_value <= balanceOf[_from], "Not enough balance");
        require(_value <= allownace[_from][msg.sender],"Allowance Exceeded");
        balanceOf[_from] -= _value;
        balanceOf[-to] += -_value;
        allownace[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return ture;
    }


}