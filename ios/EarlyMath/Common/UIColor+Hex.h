//
//  UIColor+Hex.h
//  EarlyMath
//
//  Created by Designer II on 2016/10/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (Hex)

+ (UIColor *)colorWithARGBHex:(NSInteger)hexValue;

+ (UIColor *)colorWithRGBHex:(NSInteger)hexValue;

+ (UIColor *)whiteColorWithAlpha:(CGFloat)alphaValue;

+ (UIColor *)blackColorWithAlpha:(CGFloat)alphaValue;

+ (UIColor *)colorWithRGBHex:(NSInteger)hexValue alpha:(CGFloat)alpha;

- (UIColor *)blackOrWhiteContrastingColor;

- (CGFloat)luminosity;
@end
