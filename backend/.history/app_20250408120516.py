# tripwise_frontend/app.py

import streamlit as st
import requests

st.set_page_config(page_title="TripWise Chatbot", layout="centered")

st.title("✈️ TripWise Travel Assistant")
st.markdown("Ask anything about your trip: routes, bookings, places, etc.")

# Input field
user_input = st.text_input("Your question", placeholder="e.g., What’s the best time to visit Shimla?")

# Submit button
if st.button("Ask"):
    if user_input:
        with st.spinner("Thinking..."):
            try:
                response = requests.post(
                    "http://localhost:8/chat/",  # Change if deployed
                    json={"question": user_input}
                )
                if response.status_code == 200:
                    answer = response.json().get("response")
                    st.success("Here's what I found:")
                    st.write(answer)
                else:
                    st.error("Server error. Please try again.")
            except Exception as e:
                st.error(f"Request failed: {e}")
    else:
        st.warning("Please enter a question.")
