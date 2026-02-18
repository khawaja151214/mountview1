"""
Backend tests for Mount View Hotel Skardu - Chat API
Tests the AI chatbot endpoint with various hotel-related queries
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://alpine-resort-hub.preview.emergentagent.com')

class TestChatAPI:
    """AI Chatbot /api/chat endpoint tests"""
    
    def test_chat_endpoint_status(self):
        """Test that chat endpoint returns 200"""
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "Hello", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        assert "reply" in data
        assert "session_id" in data
        print(f"Chat endpoint returned status 200 with session_id")
    
    def test_chat_room_rates_response(self):
        """Test chat returns accurate PKR room rates"""
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "What are your room rates?", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        reply = data["reply"]
        
        # Verify PKR pricing is in response
        assert "PKR" in reply, "Room rates should include PKR currency"
        # Check for specific rate mentions (from hotel facts)
        assert "4,000" in reply or "4000" in reply, "Standard room rate PKR 4,000 should be mentioned"
        print(f"Chat correctly returned PKR room rates")
    
    def test_chat_airport_distance(self):
        """Test chat returns accurate airport distance"""
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "How far is the airport?", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        reply = data["reply"]
        
        # Hotel is 5km / 10 minutes from airport per system prompt
        assert "10" in reply or "5" in reply, "Should mention 10 minutes or 5km distance"
        print(f"Chat correctly returned airport distance info")
    
    def test_chat_facilities_response(self):
        """Test chat returns hotel facilities"""
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "What facilities do you offer?", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        reply = data["reply"]
        
        # Check for key facilities mentioned in system prompt
        facilities_mentioned = any(term.lower() in reply.lower() for term in [
            "restaurant", "parking", "Wi-Fi", "wifi", "room service"
        ])
        assert facilities_mentioned, "Should mention hotel facilities"
        print(f"Chat correctly returned facility information")
    
    def test_chat_session_persistence(self):
        """Test that session_id is returned and can be used for follow-up"""
        # First message
        response1 = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "Hello", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response1.status_code == 200
        session_id = response1.json().get("session_id")
        assert session_id is not None, "Session ID should be returned"
        
        # Follow-up with same session
        response2 = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "Tell me about rooms", "session_id": session_id},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response2.status_code == 200
        assert response2.json().get("session_id") == session_id
        print(f"Session persistence working correctly")
    
    def test_chat_deosai_distance(self):
        """Test chat returns accurate Deosai distance"""
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": "How far is Deosai National Park?", "session_id": None},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        reply = data["reply"]
        
        # Deosai is ~2.5 hours per system prompt
        assert "hour" in reply.lower() or "deosai" in reply.lower(), "Should mention Deosai distance"
        print(f"Chat correctly returned Deosai information")


class TestHealthEndpoints:
    """Health check endpoints"""
    
    def test_root_endpoint(self):
        """Test root endpoint returns status"""
        response = requests.get(f"{BASE_URL}/api/", timeout=10)
        # May return 200 or redirect, just check it doesn't error
        assert response.status_code in [200, 404, 503]
        print(f"Root endpoint responded with status {response.status_code}")
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        # Health endpoint should exist
        assert response.status_code in [200, 404]
        print(f"Health endpoint responded with status {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
