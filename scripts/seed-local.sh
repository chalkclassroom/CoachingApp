#!/bin/bash
# Seed script for local Firebase emulators
# Run this after starting emulators with: npm run firebase:local or the demo project

AUTH_URL="http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key"
FIRESTORE_URL="http://localhost:8080/v1/projects/demo-chalk/databases/(default)/documents"

echo "=== Seeding Firebase Emulators ==="

# Function to create auth user
create_auth_user() {
  local email=$1
  local password=$2
  local uid=$3

  echo "Creating auth user: $email"
  curl -s -X POST "$AUTH_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"$email\",
      \"password\": \"$password\",
      \"localId\": \"$uid\"
    }" > /dev/null
}

# Function to create Firestore user document
create_user_doc() {
  local uid=$1
  local firstName=$2
  local lastName=$3
  local email=$4
  local role=$5
  local school=$6

  echo "Creating Firestore user: $firstName $lastName ($role)"
  curl -s -X PATCH "$FIRESTORE_URL/users/$uid" \
    -H "Content-Type: application/json" \
    -d "{
      \"fields\": {
        \"id\": {\"stringValue\": \"$uid\"},
        \"firstName\": {\"stringValue\": \"$firstName\"},
        \"lastName\": {\"stringValue\": \"$lastName\"},
        \"email\": {\"stringValue\": \"$email\"},
        \"role\": {\"stringValue\": \"$role\"},
        \"archived\": {\"booleanValue\": false},
        \"school\": {\"stringValue\": \"$school\"},
        \"phone\": {\"stringValue\": \"555-0100\"},
        \"notes\": {\"stringValue\": \"\"}
      }
    }" > /dev/null
}

# Create users with different roles
echo ""
echo "--- Creating Auth Users ---"

# Admin user
create_auth_user "admin@chalk.local" "admin123" "admin-001"
# Program Leader
create_auth_user "leader@chalk.local" "leader123" "leader-001"
# Site Leader
create_auth_user "site@chalk.local" "site123" "site-001"
# Coaches
create_auth_user "coach1@chalk.local" "coach123" "coach-001"
create_auth_user "coach2@chalk.local" "coach123" "coach-002"
# Teachers
create_auth_user "teacher1@chalk.local" "teacher123" "teacher-001"
create_auth_user "teacher2@chalk.local" "teacher123" "teacher-002"
create_auth_user "teacher3@chalk.local" "teacher123" "teacher-003"

echo ""
echo "--- Creating Firestore User Documents ---"

# Admin
create_user_doc "admin-001" "Admin" "User" "admin@chalk.local" "admin" "CHALK Admin Office"

# Program Leader
create_user_doc "leader-001" "Program" "Leader" "leader@chalk.local" "programLeader" "District Office"

# Site Leader
create_user_doc "site-001" "Site" "Leader" "site@chalk.local" "siteLeader" "Lincoln Elementary"

# Coaches
create_user_doc "coach-001" "Maria" "Garcia" "coach1@chalk.local" "coach" "Lincoln Elementary"
create_user_doc "coach-002" "John" "Smith" "coach2@chalk.local" "coach" "Washington Elementary"

# Teachers
create_user_doc "teacher-001" "Sarah" "Johnson" "teacher1@chalk.local" "teacher" "Lincoln Elementary"
create_user_doc "teacher-002" "Michael" "Brown" "teacher2@chalk.local" "teacher" "Lincoln Elementary"
create_user_doc "teacher-003" "Emily" "Davis" "teacher3@chalk.local" "teacher" "Washington Elementary"

# Practice Teacher (special ID used by the app)
echo "Creating Practice Teacher..."
curl -s -X PATCH "$FIRESTORE_URL/users/rJxNhJmzjRZP7xg29Ko6" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "id": {"stringValue": "rJxNhJmzjRZP7xg29Ko6"},
      "firstName": {"stringValue": "Practice"},
      "lastName": {"stringValue": "Teacher"},
      "email": {"stringValue": "practice@teacher.edu"},
      "role": {"stringValue": "teacher"},
      "archived": {"booleanValue": false},
      "school": {"stringValue": "Elum Entaree School"},
      "phone": {"stringValue": "012-345-6789"},
      "notes": {"stringValue": "Notes are a useful place to put highlights or reminders!"}
    }
  }' > /dev/null

echo ""
echo "=== Seed Complete ==="
echo ""
echo "Test accounts created:"
echo "  Admin:          admin@chalk.local / admin123"
echo "  Program Leader: leader@chalk.local / leader123"
echo "  Site Leader:    site@chalk.local / site123"
echo "  Coach 1:        coach1@chalk.local / coach123"
echo "  Coach 2:        coach2@chalk.local / coach123"
echo "  Teacher 1:      teacher1@chalk.local / teacher123"
echo "  Teacher 2:      teacher2@chalk.local / teacher123"
echo "  Teacher 3:      teacher3@chalk.local / teacher123"
echo ""
echo "View data at: http://localhost:4000"
