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
@property (nonatomic, assign) BOOL isSpeaking;

@end

@implementation EMSpeecher {
}

- (BDSSpeechSynthesizer *)iFlySpeechSynthesizer {
  if (!_speechSynthesizer) {
    _speechSynthesizer = [BDSSpeechSynthesizer sharedInstance];
    [_speechSynthesizer setSynthesizerDelegate:self];
    [self configureOnlineTTS];
  }
  return _speechSynthesizer;
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
  [self.speechSynthesizer speakSentence:cardItem[key] withError:nil];
}

-(void)configureOnlineTTS{
  //#error "Set api key and secret key"
  [[BDSSpeechSynthesizer sharedInstance] setApiKey:@"smjpzMZK9KpeNyYzlbYmG0pK" withSecretKey:@"3f60cf4dce8e615a7d192b26ac3b3d1f"];
}

//-(void)configureOfflineTTS{
//  NSString* offlineEngineSpeechData = [[NSBundle mainBundle] pathForResource:@"Chinese_Speech_Female" ofType:@"dat"];
//  NSString* offlineEngineTextData = [[NSBundle mainBundle] pathForResource:@"Chinese_Text" ofType:@"dat"];
//  NSString* offlineEngineEnglishSpeechData = [[NSBundle mainBundle] pathForResource:@"English_Speech_Female" ofType:@"dat"];
//  NSString* offlineEngineEnglishTextData = [[NSBundle mainBundle] pathForResource:@"English_Text" ofType:@"dat"];
//  NSString* offlineEngineLicenseFile = [[NSBundle mainBundle] pathForResource:@"offline_engine_tmp_license" ofType:@"dat"];
//  //#error "set offline engine license"
//  NSError* err = [[BDSSpeechSynthesizer sharedInstance] loadOfflineEngine:offlineEngineTextData speechDataPath:offlineEngineSpeechData licenseFilePath:offlineEngineLicenseFile withAppCode:nil];
//  if(err){
//    [self displayError:err withTitle:@"Offline TTS init failed"];
//    return;
//  }
//  [TTSConfigViewController setCurrentOfflineSpeaker:OfflineSpeaker_Female];
//  err = [[BDSSpeechSynthesizer sharedInstance] loadEnglishDataForOfflineEngine:offlineEngineEnglishTextData speechData:offlineEngineEnglishSpeechData];
//  if(err){
//    [self displayError:err withTitle:@"Offline TTS load English support failed"];
//    return;
//  }
//}

#pragma mark - IFlySpeechSynthesizer


- (void)synthesizerStartWorkingSentence:(NSInteger)SynthesizeSentence {
  _isSpeaking = YES;
}

- (void)synthesizerSpeechEndSentence:(NSInteger)SpeakSentence {
  _isSpeaking = NO;
}

@end
