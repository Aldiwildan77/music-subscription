package music

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

const createSubscriptionTable = `
CREATE TABLE IF NOT EXISTS subscriptions
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
	duration INT NOT NULL
)`

var a App

func TestMain(m *testing.M) {
	a = App{}
	a.Initialize("root", "", "bcc_music")

	ensureSubscriptionTableExists()

	code := m.Run()

	clearSubscriptionTable()

	os.Exit(code)
}

func ensureSubscriptionTableExists() {
	if _, err := a.DB.Exec(createSubscriptionTable); err != nil {
		log.Fatal(err)
	}
}

func clearSubscriptionTable() {
	a.DB.Exec("DELETE FROM subscriptions")
	a.DB.Exec("ALTER TABLE subscriptions AUTO_INCREMENT = 1")
}

func TestEmptySubscriptionTable(t *testing.T) {
	clearSubscriptionTable()

	req, _ := http.NewRequest("GET", "/api/subscriptions", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	if body := response.Body.String(); body != "[]" {
		t.Errorf("Expected an empty array. Got %s", body)
	}
}

func TestGetNonExistentSubscription(t *testing.T) {
	clearSubscriptionTable()
	req, _ := http.NewRequest("GET", "/api/subscription/45", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
	var m map[string]string
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["error"] != "Subscription not found" {
		t.Errorf("Expected the 'error' key of the response to be set to 'Subscription not found'. Got '%s'", m["error"])
	}
}

func TestCreateSubscription(t *testing.T) {
	clearSubscriptionTable()

	payload := []byte(`{"name":"test subscription","price":30,"duration":10}`)

	req, _ := http.NewRequest("POST", "/api/subscription", bytes.NewBuffer(payload))
	response := executeRequest(req)

	checkResponseCode(t, http.StatusCreated, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["name"] != "test subscription" {
		t.Errorf("Expected subscription's name to be 'test subscription'. Got '%v'", m["name"])
	}

	if m["price"] != 30.0 {
		t.Errorf("Expected subscription's age to be '30'. Got '%v'", m["price"])
	}

	if m["duration"] != 10.0 {
		t.Errorf("Expected subscription's duration to be '10'. Got '%v'", m["duration"])
	}

	if m["subscription_id"] != 1.0 {
		t.Errorf("Expected subscription ID to be '1'. Got '%v'", m["id"])
	}
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)

	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}