#!/usr/bin/mongo

var db = new Mongo().getDB("bugsdb");

var bugs = [
  {
    id:1, status: 'open', priority: 'danger', owner: 'norm', title: 'this is big'
  },
  {
    id:2, status: 'open', priority: 'danger', owner: 'norm', title: 'this is big'
  },
  {
    id:3, status: 'open', priority: 'danger', owner: 'norm', title: 'this is big'
  },
  {
    id:4, status: 'open', priority: 'danger', owner: 'norm', title: 'this is big'
  }
]
db.bugs.remove({});
db.bugs.insert(bugs);
