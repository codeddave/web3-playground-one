pragma solidity ^0.5.0;


contract SecondContract{
string public functionCalled;

    function sendEther()  external payable  {
        functionCalled = "sendEther";
    }

    function() external payable{
            functionCalled = 'fallBack';

    }
}