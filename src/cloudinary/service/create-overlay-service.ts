export class CreateOverlayService {
  public static create(text: string, yOffset: number, fontSize: number) {
    return {
      text: {
        text, 
        fontFamily: "Impact", 
        fontSize, 
        color: "#FFFFFF", 
        lineSpacing: 100,
        letterSpacing: 3,
      },
      position: {
        gravity: "south", 
        x: 0, 
        y: yOffset, 
      },
    };
  }
}
