#!/bin/bash
mongoimport -d deimos_test --drop -c accounts < db_json/json/accounts.json
mongoimport -d deimos_test --drop -c avatars < db_json/json/avatars.json
mongoimport -d deimos_test --drop -c gameareas < db_json/json/gameareas.json
mongoimport -d deimos_test --drop -c itemtemplates < db_json/json/itemtemplates.json
mongoimport -d deimos_test --drop -c monstertemplates < db_json/json/monstertemplates.json
mongoimport -d deimos_test --drop -c effects < db_json/json/effects.json
mongoimport -d deimos_test --drop -c rectanglezonetemplates < db_json/json/rectanglezonetemplates.json
mongoimport -d deimos_test --drop -c spherezonetemplates < db_json/json/spherezonetemplates.json
mongoimport -d deimos_test --drop -c skills < db_json/json/skills.json
