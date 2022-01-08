// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

contract Things {
    uint256 count = 0;
    mapping(uint256 => thing) public indexes;

    struct thing {
        string tobebought;
        bool bought;
    }

    thing java;

    function enterItems(string memory _name) public returns (string memory) {
        count++;
        indexes[count] = thing(_name, false);
        return _name;
    }

    function removeItems(uint256 index) public {
        thing storage one = indexes[index];
        thing storage two = indexes[count];
        indexes[index] = two;
        indexes[count] = one;
        count--;
    }

    function retreive(uint256 index) public view returns (string memory, bool) {
        require(index <= count);
        thing memory t = indexes[index];
        return (t.tobebought, t.bought);
    }

    function gettot() public view returns (uint256) {
        return count;
    }

    function toggle(uint256 index) public returns (string memory, bool) {
        thing storage t = indexes[index];
        t.bought = true;
    }
}
