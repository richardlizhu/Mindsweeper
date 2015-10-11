//muse-io --osc osc.udp://localhost:5001,osc.udp://localhost:5002


import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myBroadcastLocation; 
JSONObject interest;

String broadcastIP = "127.0.0.1";
int broadcastPort = 5001;
int listeningPort = 5001;

PFont bigFont;
PFont smFont;

// muse
int museBattery = 0;
int[] museStatus;
float museEEG[][];

//output file

int count = 0;

//for finding averages

float oldRunBeta = 0;
float oldRunGamma = 0;
float oldRunLBeta = 0;
float oldRunLGamma = 0;

//currnet averages
float runBeta = 0;
float runGamma = 0;
float runLBeta = 0;
float runLGamma = 0;

//init values
float BetaInit = 0;
float GammaInit = 0;
float LBetaInit = 0;
float LGammaInit = 0;

//median  
int index = 0;
float[] listofLBeta = new float[51];
float[] listofLGamma = new float[51];
float BetaMedian = 0;
float GammaMedian = 0;
float oldLBetaMedian = 0;
float oldLGammaMedian = 0;

// Reset these
boolean foundInits = false;
int counter = 0;

float beta = 0;
float Lbeta = 0;
float gamma = 0;
float Lgammma = 0;
float inbeta = 0;
float ingamma = 0;
float inLbeta = 0;
float inLgamma = 0;

//total sums
int totalCount = 0;
float totalBeta = 0;
float totalGamma = 0;
float totalLBeta = 0;
float totalLGamma = 0;

//stop
boolean tempStop = false;

void setup()
{
  //size(600,850);

  clearValues();
  
  /* create a new instance of oscP5. 
   * 12000 is the port number you are listening for incoming osc messages.
   */
  oscP5 = new OscP5(this,listeningPort);

  /* the address of the osc broadcast server */
  myBroadcastLocation = new NetAddress(broadcastIP, broadcastPort);
  
//  smFont = createFont("", 20);
//  bigFont = createFont("", 40);
//  textFont(bigFont);
  
  prepareExitHandler();
  connectOscClient();
  
  //initialize the values

  //while (true)
  
}

void draw(){
 return; 
}
    
//starting the loop
void draw2()
{
  if (tempStop)
  {
    return;
  }
  //background(255);
  //noStroke();
  
  //textFont(bigFont);
  //fill(255,0,0);
  
  //text("MUSE", 50,50);
  
  //textFont(smFont);
  //fill(0);
//  int x1 = 50;
//  int x2 = x1+250;
//  int y1 = 100;
//  r
//  // muse
//  text("battery", x1, y1+=20);
//  text(museBattery + " %", x2, y1);
//  y1+=20;
//  text("status_indicator", x1, y1+=20);
//  text(museStatus[0] + " " + museStatus[1] + " " + museStatus[2] + " " + museStatus[3], x2, y1);
//  
  float beta = 0;
  float gamma = 0;
  float Lbeta = 0;
  float Lgamma = 0;
  //loop summing values for all 4 sensors
  for(int i=0; i<4; i++)
  {
    beta += museEEG[i][3];
    gamma += museEEG[1][4];
  }
  //single values for beta and gamma
  Lbeta = museEEG[1][3];
  Lgamma = museEEG[1][4];
  
  //list of beta/gamma
  listofLBeta[index] = Lbeta;
  listofLGamma[index] = Lgamma;
  
  index +=1;
  
  if (count == 50)
  {
    //reset
    index = 0;
    count = 0;
    
    //median
    listofLBeta = sort(listofLBeta);
    listofLGamma = sort(listofLGamma);
    BetaMedian = listofLBeta[24];
    GammaMedian = listofLGamma[24];

    //display
//    text("Beta", 50, 325);
//    text(runBeta/50, 100, 350);
//    text("Gamma", 50, 375);
//    text(runGamma/50, 100, 400);
//    text("LBeta", 50, 425);
//    text(runLBeta/50, 100, 450);
//    text("LGamma", 50, 475);
//    text(runLGamma/50, 100, 500);
//    text("LBetaMedian", 50, 525);
//    text(BetaMedian, 100, 550);
//    text("LGammaMedian", 50, 575);
//    text(GammaMedian, 100, 600);
    
    //save values
    oldRunBeta = runBeta/50.0;
    oldRunGamma = runGamma/50.0;
    oldRunLBeta = runLBeta/50.0;
    oldRunLGamma = runLGamma/50.0;
    
    
    // Printing for Shell-based-UI
//    print("Beta", oldRunBeta,"\n");
//    print("Gamma",oldRunGamma,"\n");
//    print("LBeta",oldRunLBeta,"\n");
//    print("LGamma",oldRunLGamma,"\n");
    
    
    //reset
    runBeta = 0;
    runGamma = 0;
    runLBeta = 0;
    runLGamma = 0;
    
  }
  else
  {
    runBeta += beta / 4;
    runGamma += gamma / 4;
    runLBeta += Lbeta;
    runLGamma += Lgamma;
  }
  count++;
  
  //summing totals
  totalCount++;
  totalBeta += beta / 4;
  totalGamma += gamma / 4;
  totalLBeta += Lbeta / 4;
  totalLGamma += Lgamma / 4;
  
 //start and stop
  if (keyPressed)
  {
    if ( (key == 'r') || (key == 'R'))
    {
      //reset
      //print("double faffer");
      foundInits = false;
      counter = 0;

      beta = 0;
      Lbeta = 0;
      gamma = 0;
      Lgammma = 0;
      inbeta = 0;
      ingamma = 0;
      inLbeta = 0;
      inLgamma = 0;
      
      totalCount = 0;
      totalBeta = 0;
      totalGamma = 0;
      totalLBeta = 0;
      totalLGamma = 0;
    }
    else if ( (key == 'z') || (key == 'Z') )
    {
      tempStop = true;
      float averageBeta = 0;
      float averageGamma = 0;
      float averageLBeta = 0;
      float averageLGamma = 0;
      float calcValueB = 0;
      float calcValueG = 0;
      
      averageBeta = totalBeta / totalCount;
      averageGamma = totalGamma / totalCount;
      averageLBeta = totalLBeta / totalCount;
      averageLGamma = totalLGamma / totalCount;
      
      calcValueB = log(exp(BetaInit - averageBeta)/3+2*exp(LBetaInit - averageLBeta)/3);
      calcValueG = log(exp(GammaInit - averageGamma)/3+2*exp(LGammaInit - averageLGamma)/3);
      
      calcValueB = ((calcValueB / 4) + .5 ) * 100;
      calcValueG = ((calcValueG / 4) + .5 ) * 100;
      
      //Anthony's Adjustment
      calcValueB = (calcValueB - 40)*2.5;
      calcValueG = (calcValueG - 40)*2.5;
      
      interest = new JSONObject();
      interest.setFloat("avgB", averageBeta);
      interest.setFloat("initB", BetaInit);
      interest.setFloat("avgG", averageGamma);
      interest.setFloat("initG", GammaInit);
      interest.setFloat("avgLB", averageLBeta);
      interest.setFloat("initLB", LBetaInit);
      interest.setFloat("avgLG", averageLGamma);
      interest.setFloat("initLG", LGammaInit);
      interest.setFloat("calcB", calcValueB);
      interest.setFloat("calcG", calcValueG);
      saveJSONObject(interest, "test.json");
      tempStop = false;
    }
  }
 
  
  
  
  //fix flashing issue
//    text("Beta", 50, 325);
//    text(oldRunBeta, 100, 350);
//    text("Gamma", 50, 375);
//    text(oldRunGamma, 100, 400);
//    text("LBeta", 50, 425);
//    text(oldRunLBeta, 100, 450);
//    text("LGamma", 50, 475);
//    text(oldRunLGamma, 100, 500);
//    text("LBetaMedian", 50, 525);
//    text(BetaMedian, 100, 550);
//    text("LGammaMedian", 50, 575);
//    text(GammaMedian, 100, 600);  
}
  
  
/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  // theOscMessage.print();
  
  // muse
  if (theOscMessage.addrPattern().equals("/muse/elements/horseshoe")) {
      for (int i=0; i<4; i++) museStatus[i] = int(theOscMessage.get(i).floatValue());
  } else if (theOscMessage.addrPattern().equals("/muse/config")) {
    String config_json = theOscMessage.get(0).stringValue();
    JSONObject jo = JSONObject.parse(config_json);
    museBattery = jo.getInt("battery_percent_remaining");
  } else if (theOscMessage.addrPattern().equals("/muse/elements/delta_absolute")) {
    for(int i=0; i<4; i++) {
      museEEG[i][0] = theOscMessage.get(i).floatValue();
    }
  } else if (theOscMessage.addrPattern().equals("/muse/elements/theta_absolute")) {
    for(int i=0; i<4; i++) {
      museEEG[i][1] = theOscMessage.get(i).floatValue();
    }
  } else if (theOscMessage.addrPattern().equals("/muse/elements/alpha_absolute")) {
    for(int i=0; i<4; i++) {
      museEEG[i][2] = theOscMessage.get(i).floatValue();
    }
  } else if (theOscMessage.addrPattern().equals("/muse/elements/beta_absolute")) {
    for(int i=0; i<4; i++) {
      museEEG[i][3] = theOscMessage.get(i).floatValue();
    }
  } else if (theOscMessage.addrPattern().equals("/muse/elements/gamma_absolute")) {
    for(int i=0; i<4; i++) {
      museEEG[i][4] = theOscMessage.get(i).floatValue();
    }
  }
 {
    if (( (museEEG[0][3] == 0) && (museEEG[1][3] == 0) && (museEEG[2][3] == 0) && (museEEG[3][3] == 0) && (museEEG[3][4] == 0)) || ( (museStatus[0] != 1) || (museStatus[1] != 1) || (museStatus[2] != 1) || (museStatus[3] != 1) ) )
    {
      return;
    }
    else if ( foundInits == false)
    {   
      if (counter < 100) {
        //initializing 4 factors
        for(int j=0; j<4; j++)
        {
          beta += museEEG[j][3];
          gamma += museEEG[j][4];
        }
        inbeta += beta / 4;
        beta = 0;
        ingamma += gamma / 4;
        gamma = 0;
        inLbeta += museEEG[1][3];
        inLgamma += museEEG[1][4];
        counter += 1;
      }
      else if (counter == 100){
      BetaInit = inbeta / 100;
      GammaInit = ingamma / 100;
      LBetaInit = inLbeta / 100;
      LGammaInit = inLgamma / 100;
      print(BetaInit);
      print(GammaInit);
      print(LBetaInit);
      print(LGammaInit);
      foundInits = true;
    }
  
  } 
  else {
    draw2();
  }
}
}


void clearValues() {
  
  
  // muse
  museBattery = 0;
  museStatus = new int[4];
  for (int i=0; i<4; i++) museStatus[i] = 4;
  museEEG = new float[4][5];
  for (int i=0; i<4; i++) {
    for (int j=0; j<5; j++) {
      museEEG[i][j] = 0;
    }
  }
  
}

void connectOscClient() {
  OscMessage m;
  println("connect");
  /* connect to the broadcaster */
  m = new OscMessage("/eeg/connect",new Object[0]);
  oscP5.flush(m,myBroadcastLocation);  
} 

void disconnectOscClient() {
  OscMessage m;
  println("disconnect");
  /* disconnect from the broadcaster */
  m = new OscMessage("/eeg/disconnect",new Object[0]);
  oscP5.flush(m,myBroadcastLocation);  
}


  
private void prepareExitHandler() {
 Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
   public void run () {
//     System.out.println("SHUTDOWN HOOK");
     try {
       disconnectOscClient();
     } catch (Exception ex){
       ex.printStackTrace(); // not much else to do at this point
     }
   }
 }));
} 

