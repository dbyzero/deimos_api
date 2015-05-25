#!/bin/bash
mongoimport -d deimos_test --drop -c accounts < json/accounts.json
mongoimport -d deimos_test --drop -c avatars < json/avatars.json
mongoimport -d deimos_test --drop -c gameareas < json/gameareas.json
mongoimport -d deimos_test --drop -c itemtemplates < json/itemtemplates.json
mongoimport -d deimos_test --drop -c monstertemplates < json/monstertemplates.json