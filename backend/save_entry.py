import json
from datetime import datetime

def main():
    print("\n=== Add New Reflection ===")
    
    # Get user input
    reflection_text = input("Enter your reflection: ")
    
    # Create reflection with date
    reflection = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "content": reflection_text
    }
    
    # Load existing reflections
    try:
        with open('reflections.json', 'r') as file:
            reflections = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        reflections = []
    
    # Add new reflection
    reflections.append(reflection)
    
    # Save back to file
    with open('reflections.json', 'w') as file:
        json.dump(reflections, file, indent=2)
    
    print(f"Reflection saved! Total reflections: {len(reflections)}")

if __name__ == "__main__":
    main()