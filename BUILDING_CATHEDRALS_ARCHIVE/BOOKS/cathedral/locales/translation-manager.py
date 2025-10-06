#!/usr/bin/env python3
# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
"""
Cathedral of Circuits - Translation Management System
Comprehensive i18n support for 12 languages with trauma-informed safety
"""

import os
import json
import sys
import argparse
from pathlib import Path
from typing import Dict, List, Any, Optional

class CathedralTranslationManager:
    def __init__(self, base_dir: Optional[str] = None):
        """Initialize translation manager with locales directory."""
        if base_dir:
            self.base_dir = Path(base_dir)
        else:
            self.base_dir = Path(__file__).parent
        
        # Enhanced language metadata with priority and market data
        self.languages = {
            'en': {
                'name': 'English', 
                'native': 'English',
                'rtl': False, 
                'complete': True, 
                'completion': 100,
                'priority': 1,
                'market_size': 1500,  # millions of speakers
                'complexity': 'low',
                'cultural_context': 'western'
            },
            'es': {
                'name': 'Spanish', 
                'native': 'Español',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 2,
                'market_size': 500,
                'complexity': 'low',
                'cultural_context': 'western'
            },
            'fr': {
                'name': 'French', 
                'native': 'Français',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 3,
                'market_size': 280,
                'complexity': 'medium',
                'cultural_context': 'western'
            },
            'de': {
                'name': 'German', 
                'native': 'Deutsch',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 4,
                'market_size': 100,
                'complexity': 'medium',
                'cultural_context': 'western'
            },
            'pt': {
                'name': 'Portuguese', 
                'native': 'Português',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 5,
                'market_size': 260,
                'complexity': 'medium',
                'cultural_context': 'western'
            },
            'it': {
                'name': 'Italian', 
                'native': 'Italiano',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 6,
                'market_size': 65,
                'complexity': 'medium',
                'cultural_context': 'western'
            },
            'ru': {
                'name': 'Russian', 
                'native': 'Русский',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 7,
                'market_size': 258,
                'complexity': 'high',
                'cultural_context': 'eastern'
            },
            'zh-CN': {
                'name': 'Chinese (Simplified)', 
                'native': '简体中文',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 8,
                'market_size': 1100,
                'complexity': 'very_high',
                'cultural_context': 'eastern'
            },
            'ja': {
                'name': 'Japanese', 
                'native': '日本語',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 9,
                'market_size': 125,
                'complexity': 'very_high',
                'cultural_context': 'eastern'
            },
            'ko': {
                'name': 'Korean', 
                'native': '한국어',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 10,
                'market_size': 77,
                'complexity': 'high',
                'cultural_context': 'eastern'
            },
            'ar': {
                'name': 'Arabic', 
                'native': 'العربية',
                'rtl': True, 
                'complete': False, 
                'completion': 0,
                'priority': 11,
                'market_size': 420,
                'complexity': 'very_high',
                'cultural_context': 'middle_eastern'
            },
            'hi': {
                'name': 'Hindi', 
                'native': 'हिन्दी',
                'rtl': False, 
                'complete': False, 
                'completion': 0,
                'priority': 12,
                'market_size': 600,
                'complexity': 'high',
                'cultural_context': 'south_asian'
            }
        }
        
        self.translation_files = [
            'interface.json',
            'safety.json', 
            'accessibility.json',
            'sacred.json',
            'tarot.json',
            'alchemy.json'
        ]
        
    def create_language_directory(self, lang_code: str) -> bool:
        """Create directory structure for a language."""
        try:
            lang_dir = self.base_dir / lang_code
            lang_dir.mkdir(exist_ok=True)
            print(f"✅ Created directory: {lang_dir}")
            return True
        except Exception as e:
            print(f"❌ Failed to create {lang_code}: {e}")
            return False
    
    def get_base_translations(self) -> Dict[str, Dict]:
        """Load English base translations for reference."""
        base_translations = {}
        en_dir = self.base_dir / 'en'
        
        if not en_dir.exists():
            print("❌ English base directory not found")
            return {}
        
        for file_name in self.translation_files:
            file_path = en_dir / file_name
            if file_path.exists():
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        base_translations[file_name] = json.load(f)
                except Exception as e:
                    print(f"⚠️ Could not load {file_name}: {e}")
        
        return base_translations
    
    def create_placeholder_translations(self, lang_code: str, base_translations: Dict) -> bool:
        """Create placeholder translation files for a language."""
        lang_dir = self.base_dir / lang_code
        lang_info = self.languages.get(lang_code, {})
        
        try:
            for file_name, translations in base_translations.items():
                output_file = lang_dir / file_name
                
                # Create placeholder structure with translation notes
                placeholder_content = self._create_placeholder_structure(
                    translations, 
                    lang_code, 
                    lang_info.get('name', lang_code),
                    file_name
                )
                
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(placeholder_content, f, ensure_ascii=False, indent=2)
                
                print(f"  📝 Created {file_name}")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to create translations for {lang_code}: {e}")
            return False
    
    def _create_placeholder_structure(self, base_data: Dict, lang_code: str, 
                                    lang_name: str, file_name: str) -> Dict:
        """Create placeholder structure maintaining original keys."""
        
        placeholder = {
            "_meta": {
                "language": lang_code,
                "language_name": lang_name,
                "file": file_name,
                "status": "placeholder",
                "completion": "0%",
                "translator_notes": f"This file contains placeholder translations for {lang_name}. Please translate all values while keeping keys unchanged.",
                "cultural_notes": f"Consider cultural sensitivity and spiritual appropriateness for {lang_name} speakers.",
                "rtl": self.languages.get(lang_code, {}).get('rtl', False)
            }
        }
        
        # Recursively create placeholder structure
        def create_placeholders(obj, path=""):
            if isinstance(obj, dict):
                result = {}
                for key, value in obj.items():
                    if key.startswith('_'):  # Skip meta keys
                        continue
                    result[key] = create_placeholders(value, f"{path}.{key}" if path else key)
                return result
            elif isinstance(obj, str):
                # Create translation placeholder
                return f"[TRANSLATE:{lang_code}] {obj}"
            elif isinstance(obj, list):
                return [create_placeholders(item, f"{path}[{i}]") for i, item in enumerate(obj)]
            else:
                return obj
        
        # Add placeholders for all original content
        for key, value in base_data.items():
            if not key.startswith('_'):
                placeholder[key] = create_placeholders(value, key)
        
        return placeholder
    
    def create_all_languages(self) -> Dict[str, bool]:
        """Create directory structure and placeholder files for all languages."""
        print("🌍 Creating translation structure for all languages...")
        
        # Load base English translations
        base_translations = self.get_base_translations()
        if not base_translations:
            print("❌ No base translations found. Please ensure English translations exist.")
            return {}
        
        results = {}
        
        for lang_code, lang_info in self.languages.items():
            if lang_code == 'en':  # Skip English base
                continue
                
            print(f"\n🗣️ Setting up {lang_info['name']} ({lang_code})...")
            
            # Create directory
            dir_success = self.create_language_directory(lang_code)
            
            # Create placeholder translations
            trans_success = False
            if dir_success:
                trans_success = self.create_placeholder_translations(lang_code, base_translations)
            
            results[lang_code] = dir_success and trans_success
            
            if results[lang_code]:
                print(f"✅ {lang_info['name']} setup complete")
            else:
                print(f"❌ {lang_info['name']} setup failed")
        
        return results
    
    def validate_translations(self, lang_code: str) -> Dict[str, Any]:
        """Validate translation completeness and structure."""
        lang_dir = self.base_dir / lang_code
        base_translations = self.get_base_translations()
        
        validation_result = {
            'language': lang_code,
            'exists': lang_dir.exists(),
            'files': {},
            'completion_percentage': 0,
            'missing_keys': [],
            'extra_keys': [],
            'issues': []
        }
        
        if not validation_result['exists']:
            validation_result['issues'].append(f"Language directory {lang_code} does not exist")
            return validation_result
        
        total_strings = 0
        translated_strings = 0
        
        for file_name in self.translation_files:
            file_path = lang_dir / file_name
            base_content = base_translations.get(file_name, {})
            
            file_result = {
                'exists': file_path.exists(),
                'completion': 0,
                'total_strings': 0,
                'translated_strings': 0,
                'issues': []
            }
            
            if file_result['exists'] and base_content:
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = json.load(f)
                    
                    file_total, file_translated = self._count_translations(content, base_content)
                    file_result['total_strings'] = file_total
                    file_result['translated_strings'] = file_translated
                    file_result['completion'] = (file_translated / file_total * 100) if file_total > 0 else 0
                    
                    total_strings += file_total
                    translated_strings += file_translated
                    
                except Exception as e:
                    file_result['issues'].append(f"Could not parse {file_name}: {e}")
            
            validation_result['files'][file_name] = file_result
        
        validation_result['completion_percentage'] = (translated_strings / total_strings * 100) if total_strings > 0 else 0
        
        return validation_result
    
    def _count_translations(self, content: Dict, base_content: Dict) -> tuple:
        """Count total vs translated strings in content."""
        def count_strings(obj):
            if isinstance(obj, dict):
                total = 0
                for key, value in obj.items():
                    if key.startswith('_'):  # Skip meta keys
                        continue
                    total += count_strings(value)
                return total
            elif isinstance(obj, str):
                return 1
            elif isinstance(obj, list):
                return sum(count_strings(item) for item in obj)
            return 0
        
        def count_translated(obj):
            if isinstance(obj, dict):
                total = 0
                for key, value in obj.items():
                    if key.startswith('_'):  # Skip meta keys
                        continue
                    total += count_translated(value)
                return total
            elif isinstance(obj, str):
                return 0 if obj.startswith('[TRANSLATE:') else 1
            elif isinstance(obj, list):
                return sum(count_translated(item) for item in obj)
            return 0
        
        total = count_strings(base_content)
        translated = count_translated(content)
        
        return total, translated
    
    def generate_translation_status_report(self) -> str:
        """Generate comprehensive status report for all languages."""
        print("📊 Generating translation status report...")
        
        report = ["# 🌍 Cathedral of Circuits - Translation Status Report\n"]
        report.append(f"Generated: {self._get_timestamp()}\n")
        
        # Overall statistics
        total_langs = len(self.languages) - 1  # Excluding English
        completed_langs = 0
        
        report.append("## 📈 Overview\n")
        report.append(f"- **Total Languages**: {total_langs}")
        report.append(f"- **Base Language**: English")
        report.append(f"- **Translation Files**: {len(self.translation_files)}")
        
        # Language-specific status
        report.append("\n## 🗣️ Language Status\n")
        
        for lang_code, lang_info in self.languages.items():
            if lang_code == 'en':
                continue
                
            validation = self.validate_translations(lang_code)
            completion = validation['completion_percentage']
            
            status_emoji = "✅" if completion > 90 else "🔄" if completion > 10 else "❌"
            report.append(f"### {status_emoji} {lang_info['name']} ({lang_code})")
            report.append(f"- **Completion**: {completion:.1f}%")
            
            if validation['exists']:
                report.append("- **Files**:")
                for file_name, file_info in validation['files'].items():
                    file_status = "✅" if file_info['completion'] > 90 else "🔄" if file_info['exists'] else "❌"
                    report.append(f"  - {file_status} {file_name}: {file_info['completion']:.1f}%")
            else:
                report.append("- ⚠️ **Not initialized**")
            
            if validation['issues']:
                report.append("- **Issues**:")
                for issue in validation['issues']:
                    report.append(f"  - ⚠️ {issue}")
            
            report.append("")
        
        # Contribution guidelines
        report.append("## 🤝 Contributing Translations\n")
        report.append("We welcome community translations! Here's how to contribute:\n")
        report.append("1. **Choose a language** from the list above that needs translation")
        report.append("2. **Fork the repository** and create a translation branch")
        report.append("3. **Translate placeholder text** while keeping JSON keys unchanged")
        report.append("4. **Consider cultural sensitivity** for sacred and spiritual content")
        report.append("5. **Test locally** to ensure the interface works correctly")
        report.append("6. **Submit a pull request** with your translations\n")
        
        report.append("### Translation Guidelines:")
        report.append("- Maintain the same JSON structure and keys")
        report.append("- Replace `[TRANSLATE:xx]` placeholders with appropriate translations")
        report.append("- Consider cultural appropriateness for spiritual content")
        report.append("- Test with RTL languages for proper layout")
        report.append("- Include cultural notes in the `_meta` section if needed")
        
        return "\n".join(report)
    
    def _get_timestamp(self) -> str:
        """Get current timestamp for reports."""
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
    
    def export_for_translators(self, lang_code: str) -> Dict[str, str]:
        """Export flat key-value pairs for easier translation."""
        lang_dir = self.base_dir / lang_code
        base_translations = self.get_base_translations()
        
        flat_translations = {}
        
        def flatten_dict(obj, prefix=""):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    if key.startswith('_'):  # Skip meta keys
                        continue
                    new_key = f"{prefix}.{key}" if prefix else key
                    flatten_dict(value, new_key)
            elif isinstance(obj, str):
                flat_translations[prefix] = obj
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    flatten_dict(item, f"{prefix}[{i}]")
        
        for file_name, content in base_translations.items():
            flatten_dict(content, file_name.replace('.json', ''))
        
        return flat_translations
    
    def get_priority_translation_queue(self) -> List[str]:
        """Get languages sorted by translation priority and market impact."""
        # Sort by priority and market size
        sorted_langs = sorted(
            [(code, info) for code, info in self.languages.items() if code != 'en'],
            key=lambda x: (x[1]['priority'], -x[1]['market_size'])
        )
        
        return [code for code, info in sorted_langs]
    
    def estimate_translation_effort(self, lang_code: str) -> Dict[str, Any]:
        """Estimate translation effort based on language complexity and content volume."""
        if lang_code not in self.languages:
            return {'error': 'Language not supported'}
        
        lang_info = self.languages[lang_code]
        
        # Base word count estimation
        base_word_count = 2500  # Estimated total words in all translation files
        
        # Complexity multipliers
        complexity_multipliers = {
            'low': 1.0,
            'medium': 1.3,
            'high': 1.7,
            'very_high': 2.2
        }
        
        complexity = lang_info.get('complexity', 'medium')
        multiplier = complexity_multipliers.get(complexity, 1.3)
        
        estimated_hours = (base_word_count / 250) * multiplier  # 250 words per hour baseline
        
        return {
            'language': lang_info['name'],
            'native_name': lang_info['native'],
            'complexity': complexity,
            'estimated_word_count': base_word_count,
            'estimated_hours': round(estimated_hours, 1),
            'estimated_days': round(estimated_hours / 8, 1),
            'market_reach': f"{lang_info['market_size']}M speakers",
            'cultural_considerations': self._get_cultural_considerations(lang_code)
        }
    
    def _get_cultural_considerations(self, lang_code: str) -> List[str]:
        """Get cultural considerations for translation."""
        considerations = {
            'western': [
                'Direct communication style acceptable',
                'Individual empowerment themes resonate',
                'Spiritual diversity is welcomed'
            ],
            'eastern': [
                'Collective harmony concepts important',
                'Respect for traditional wisdom',
                'Balance between modern and ancient'
            ],
            'middle_eastern': [
                'Religious sensitivity crucial',
                'Family and community focus',
                'Traditional values integration'
            ],
            'south_asian': [
                'Spiritual diversity is native',
                'Karma and dharma concepts familiar',
                'Guru-student relationships respected'
            ]
        }
        
        context = self.languages[lang_code].get('cultural_context', 'western')
        return considerations.get(context, considerations['western'])
    
    def generate_translation_roadmap(self) -> str:
        """Generate a comprehensive translation roadmap."""
        roadmap = []
        roadmap.append("# 🗺️ CATHEDRAL TRANSLATION ROADMAP")
        roadmap.append("Comprehensive strategy for global language support\n")
        
        # Priority queue
        priority_queue = self.get_priority_translation_queue()
        
        roadmap.append("## 🎯 Translation Priority Queue\n")
        for i, lang_code in enumerate(priority_queue[:5], 1):  # Top 5 priorities
            lang_info = self.languages[lang_code]
            effort = self.estimate_translation_effort(lang_code)
            
            roadmap.append(f"### Phase {i}: {lang_info['native']} ({lang_code})")
            roadmap.append(f"- **Market Impact**: {lang_info['market_size']}M speakers")
            roadmap.append(f"- **Estimated Effort**: {effort['estimated_hours']} hours ({effort['estimated_days']} days)")
            roadmap.append(f"- **Complexity**: {lang_info['complexity']}")
            roadmap.append(f"- **Cultural Context**: {lang_info['cultural_context']}")
            roadmap.append("")
        
        # Resource allocation
        roadmap.append("## 🔧 Resource Allocation Strategy\n")
        roadmap.append("### Immediate Focus (Next 3 months)")
        roadmap.append("1. **Spanish (es)** - Largest Western market, low complexity")
        roadmap.append("2. **French (fr)** - Significant reach, moderate complexity")
        roadmap.append("3. **German (de)** - Technical precision, community interest\n")
        
        roadmap.append("### Medium Term (3-6 months)")
        roadmap.append("4. **Portuguese (pt)** - Growing market, shared Romance roots")
        roadmap.append("5. **Italian (it)** - Cultural affinity for spiritual content")
        roadmap.append("6. **Russian (ru)** - Major Eastern European reach\n")
        
        roadmap.append("### Long Term (6-12 months)")
        roadmap.append("7. **Chinese (zh-CN)** - Massive market, high complexity")
        roadmap.append("8. **Hindi (hi)** - Spiritual heritage alignment")
        roadmap.append("9. **Arabic (ar)** - RTL and cultural complexity")
        roadmap.append("10. **Japanese (ja)** - Precision and cultural depth")
        roadmap.append("11. **Korean (ko)** - Growing tech-spiritual intersection\n")
        
        # Quality standards
        roadmap.append("## ✨ Quality Standards\n")
        roadmap.append("- **95%+ completion** before public release")
        roadmap.append("- **Cultural sensitivity review** by native speakers")
        roadmap.append("- **Trauma-informed language** verification")
        roadmap.append("- **Accessibility compliance** testing")
        roadmap.append("- **Community feedback** integration\n")
        
        return '\n'.join(roadmap)
    
    def batch_validate_all_languages(self) -> Dict[str, Any]:
        """Validate all languages and return comprehensive results."""
        results = {}
        total_completion = 0
        
        for lang_code in self.languages:
            if lang_code == 'en':
                continue
                
            validation = self.validate_translations(lang_code)
            results[lang_code] = validation
            total_completion += validation['completion_percentage']
        
        avg_completion = total_completion / (len(self.languages) - 1)
        
        return {
            'individual_results': results,
            'average_completion': avg_completion,
            'total_languages': len(self.languages) - 1,
            'completed_languages': sum(1 for r in results.values() if r['completion_percentage'] > 90),
            'in_progress_languages': sum(1 for r in results.values() if 10 <= r['completion_percentage'] <= 90),
            'not_started_languages': sum(1 for r in results.values() if r['completion_percentage'] < 10),
            'market_coverage': sum(
                self.languages[code]['market_size'] * (results[code]['completion_percentage'] / 100)
                for code in results.keys()
            )
        }

def main():
    """Command line interface for translation manager."""
    parser = argparse.ArgumentParser(description='Cathedral Translation Manager')
    parser.add_argument('--create-all', action='store_true', 
                       help='Create all language directories and placeholder files')
    parser.add_argument('--validate', type=str, metavar='LANG',
                       help='Validate translations for specific language')
    parser.add_argument('--report', action='store_true',
                       help='Generate translation status report')
    parser.add_argument('--base-dir', type=str, metavar='PATH',
                       help='Base directory for locales')
    
    args = parser.parse_args()
    
    manager = CathedralTranslationManager(args.base_dir)
    
    if args.create_all:
        print("🌍 Cathedral Translation System - Creating All Languages")
        print("=" * 60)
        results = manager.create_all_languages()
        
        success_count = sum(1 for success in results.values() if success)
        total_count = len(results)
        
        print(f"\n📊 Summary: {success_count}/{total_count} languages set up successfully")
        
        if success_count == total_count:
            print("✅ All languages initialized! Ready for community translation.")
        else:
            print("⚠️  Some languages had issues. Check the output above.")
    
    elif args.validate:
        validation = manager.validate_translations(args.validate)
        print(f"📊 Validation Results for {args.validate}:")
        print(json.dumps(validation, indent=2))
    
    elif args.report:
        report = manager.generate_translation_status_report()
        
        # Save report to file
        report_path = manager.base_dir / 'TRANSLATION_STATUS_REPORT.md'
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"📋 Translation status report saved to: {report_path}")
        print("\n" + report)
    
    else:
        parser.print_help()

if __name__ == '__main__':
    main()