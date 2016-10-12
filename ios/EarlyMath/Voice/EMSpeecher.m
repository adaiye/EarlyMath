//
//  EMSpeecher.m
//  EarlyMath
//
//  Created by Designer II on 2016/10/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "EMSpeecher.h"
#import "iflyMSC/iflyMSC.h"

@interface EMSpeecher()<IFlySpeechSynthesizerDelegate>{

}

@property (nonatomic, strong) IFlySpeechSynthesizer * iFlySpeechSynthesizer;

@end

@implementation EMSpeecher {
}

- (IFlySpeechSynthesizer *)iFlySpeechSynthesizer {
  if (!_iFlySpeechSynthesizer) {
    _iFlySpeechSynthesizer = [IFlySpeechSynthesizer sharedInstance];
    _iFlySpeechSynthesizer.delegate = self;
    
    //设置在线工作方式
    [_iFlySpeechSynthesizer setParameter:[IFlySpeechConstant TYPE_CLOUD]
                                  forKey:[IFlySpeechConstant ENGINE_TYPE]];
    
    //设置语速1-100
    [_iFlySpeechSynthesizer setParameter:@"50" forKey:[IFlySpeechConstant SPEED]];
    
    //设置音量1-100
    [_iFlySpeechSynthesizer setParameter:@"50" forKey:[IFlySpeechConstant VOLUME]];
    
    //设置发音人
    [_iFlySpeechSynthesizer setParameter:@"vixq" forKey:[IFlySpeechConstant VOICE_NAME]];
    
    //设置音调1-100
//    [_iFlySpeechSynthesizer setParameter:@"50" forKey:[IFlySpeechConstant PITCH]];
    
    //设置采样率
//    [_iFlySpeechSynthesizer setParameter:[IFlySpeechConstant SAMPLE_RATE_16K] forKey:[IFlySpeechConstant SAMPLE_RATE]];
    
    //设置文本编码格式
//    [_iFlySpeechSynthesizer setParameter:@"unicode" forKey:[IFlySpeechConstant TEXT_ENCODING]];
  }
  return _iFlySpeechSynthesizer;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(speech:(NSDictionary *)cardItem language:(NSInteger)language)
{
  NSLog(@"%@", cardItem);
  NSString *key = language == 0 ? @"chinese" : @"english";
  if (self.iFlySpeechSynthesizer.isSpeaking) {
    [self.iFlySpeechSynthesizer stopSpeaking];
  }
  
  [self.iFlySpeechSynthesizer startSpeaking:cardItem[key]];
}

#pragma mark - IFlySpeechSynthesizer
/**
 *  结束回调
 *  当整个合成结束之后会回调此函数
 *
 *  @param error 错误码
 */
- (void) onCompleted:(IFlySpeechError*) error
{
  
}

@end
