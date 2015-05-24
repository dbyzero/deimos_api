#!/bin/bash
mongoimport -d deimos_test -c accounts < json/accounts.json
mongoimport -d deimos_test -c avatars < json/avatars.json
mongoimport -d deimos_test -c gameareas < json/gameareas.json
mongoimport -d deimos_test -c itemtemplates < json/itemtemplates.json
mongoimport -d deimos_test -c monstertemplates < json/monstertemplates.json