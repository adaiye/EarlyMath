//
//  EMSpeecher.m
//  EarlyMath
//
//  Created by Designer II on 2016/10/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "EMSpeecher.h"
#import "BDSSpeechSynthesizer.h"

@interface EMSpeecher()<BDSSpeechSynthesizerDelegate>{

}

@property (nonatomic, strong) BDSSpeechSynthesizer *speechSynthesizer;

@end

@implementation EMSpeecher {
}

- (BDSSpeechSynthesizer *)speechSynthesizer {
  if (!_speechSynthesizer) {
    _speechSynthesizer = [BDSSpeechSynthesizer sharedInstance];
    
    NSLog(@"TTS version info: %@", [BDSSpeechSynthesizer version]);
    [BDSSpeechSynthesizer setLogLevel:BDS_PUBLIC_LOG_VERBOSE];
    
    [_speechSynthesizer setSynthesizerDelegate:self];
    
    [self configureOnlineTTS];
    [self configureOfflineTTS];
    
    [_speechSynthesizer setSynthParam:@(BDS_SYNTHESIZER_SPEAKER_FEMALE) forKey:BDS_SYNTHESIZER_PARAM_SPEAKER];
    [_speechSynthesizer setSynthParam:@(5) forKey:BDS_SYNTHESIZER_PARAM_VOLUME];
    [_speechSynthesizer setSynthParam:@(5) forKey:BDS_SYNTHESIZER_PARAM_SPEED];
    [_speechSynthesizer setSynthParam:@(5) forKey:BDS_SYNTHESIZER_PARAM_PITCH];
    [_speechSynthesizer setSynthParam:@(BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_16K) forKey:BDS_SYNTHESIZER_PARAM_AUDIO_ENCODING];
    
    [_speechSynthesizer setSynthParam:@(10) forKey:BDS_SYNTHESIZER_PARAM_ONLINE_REQUEST_TIMEOUT];
  }
  return _speechSynthesizer;
}

-(void)configureOnlineTTS {
  [_speechSynthesizer setApiKey:@"smjpzMZK9KpeNyYzlbYmG0pK" withSecretKey:@"3f60cf4dce8e615a7d192b26ac3b3d1f"];
  [_speechSynthesizer setSynthParam:@(10) forKey:BDS_SYNTHESIZER_PARAM_ONLINE_REQUEST_TIMEOUT];
}

-(void)configureOfflineTTS {
//    NSString* offlineEngineSpeechData = [[NSBundle mainBundle] pathForResource:@"Chinese_Speech_Female" ofType:@"dat"];
//    NSString* offlineEngineTextData = [[NSBundle mainBundle] pathForResource:@"Chinese_Text" ofType:@"dat"];
//    NSString* offlineEngineEnglishSpeechData = [[NSBundle mainBundle] pathForResource:@"English_Speech_Female" ofType:@"dat"];
//    NSString* offlineEngineEnglishTextData = [[NSBundle mainBundle] pathForResource:@"English_Text" ofType:@"dat"];
//    NSString* offlineEngineLicenseFile = [[NSBundle mainBundle] pathForResource:@"offline_engine_tmp_license" ofType:@"dat"];
//    //#error "set offline engine license"
//    NSError* err = [[BDSSpeechSynthesizer sharedInstance] loadOfflineEngine:offlineEngineTextData speechDataPath:offlineEngineSpeechData licenseFilePath:offlineEngineLicenseFile withAppCode:nil];
//    if(err){
//      [self displayError:err withTitle:@"Offline TTS init failed"];
//      return;
//    }
//    [TTSConfigViewController setCurrentOfflineSpeaker:OfflineSpeaker_Female];
//    err = [[BDSSpeechSynthesizer sharedInstance] loadEnglishDataForOfflineEngine:offlineEngineEnglishTextData speechData:offlineEngineEnglishSpeechData];
//    if(err){
//      [self displayError:err withTitle:@"Offline TTS load English support failed"];
//      return;
//    }
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(speech:(NSDictionary *)cardItem language:(NSInteger)language)
{
  BDSSynthesizerStatus state = [self.speechSynthesizer synthesizerStatus];
  switch (state) {
    case BDS_SYNTHESIZER_STATUS_WORKING:
      [self.speechSynthesizer cancel];
      break;
    default:
      break;
  }
  
  NSString *key = language == 0 ? @"chinese" : @"english";
  NSString *value = cardItem[key];
  NSError *err;
  [self.speechSynthesizer speakSentence:value withError:&err];
  if (err) {
    NSLog(@"%@", err);
  }
}

#pragma mark - BDSSpeechSynthesizerDelegate


@end
