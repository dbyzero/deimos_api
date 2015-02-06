//DAO_Test_Avatar.js

var DAO_Test_Avatar = function(id) {
    this.id = id;
    this.name = 'Test avatar';
    this.mass = 1;
    this.move_speed = 12;
    this.jump_speed = 12;
    this.account_name = 'Test account';
    this.mental = 1;
    this.magic = 2;
    this.hp = 3;
    this.strengh = 4;
    this.agility = 5;
    this.willpower = 6;
    this.intelligence = 7;
    this.focusing = 8;
    this.item_slot_head = null;
    this.item_slot_chest = null;
    this.item_slot_foot = null;
    this.item_slot_left_hand = null;
    this.item_slot_right_hand = null;
    this.inventory = [];
    this.titleOwned = [];
    this.titleSelected = null;
}
