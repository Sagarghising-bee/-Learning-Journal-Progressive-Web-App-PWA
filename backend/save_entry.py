import json
from datetime import datetime

def main():
    # Ask user for reflection input
    reflection_text = input("Enter your reflection: ")
    
    # Create reflection data
    reflection = {
        "date": datetime.now().strftime("%Y-%m-%d"),
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
    
    print("Reflection saved successfully!")

if __name__ == "__main__":
    main()