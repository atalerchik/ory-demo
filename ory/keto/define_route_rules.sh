#!/bin/bash

set -e

# Global manager rules
curl -X PUT "http://localhost:4467/admin/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "resources:routes:*",
    "relation": "manage",
    "subject_id": "managers:global"
}'

# Area manager rules
curl -X PUT "http://localhost:4467/admin/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "resources:routes:area:<area_id>:*",
    "relation": "manage",
    "subject_id": "managers:area"
}'

# Route manager rules
curl -X PUT "http://localhost:4467/admin/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "resources:routes:route:<route_id>",
    "relation": "manage",
    "subject_id": "managers:route"
}'



# Assign global manager role
curl -X PUT "http://localhost:4466/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "managers:global",
    "relation": "role",
    "subject": ""
}'

# Assign area manager role
curl -X PUT "http://localhost:4466/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "managers:area:<area_id>",
    "relation": "role",
    "subject": ""
}'

# Assign route manager role
curl -X PUT "http://localhost:4466/relation-tuples" -H "Content-Type: application/json" -d '{
    "namespace": "myapp",
    "object": "managers:route:<route_id>",
    "relation": "role",
    "subject": ""
}'

