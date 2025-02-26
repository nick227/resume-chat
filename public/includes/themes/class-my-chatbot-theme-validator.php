<?php
/**
 * Theme Validator Class
 *
 * @package My_Chatbot
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Validator class
 */
class My_Chatbot_Theme_Validator {
    /**
     * Validates theme configuration
     *
     * @param array $config Theme configuration array.
     * @return bool|WP_Error Returns true if valid, WP_Error if invalid
     */
    public static function validate_theme_config($config) {
        if (!is_array($config)) {
            return new WP_Error('invalid_config', 'Theme configuration must be an array');
        }

        // Required fields
        $required_fields = array(
            'name',
            'version',
            'author',
            'description',
            'templates'
        );

        foreach ($required_fields as $field) {
            if (!isset($config[$field])) {
                return new WP_Error(
                    'missing_field',
                    sprintf('Required field "%s" is missing from theme configuration', $field)
                );
            }
        }

        // Validate templates
        if (!is_array($config['templates'])) {
            return new WP_Error('invalid_templates', 'Templates must be an array');
        }

        // Validate template files exist
        foreach ($config['templates'] as $template_name => $template_file) {
            if (!file_exists($template_file)) {
                return new WP_Error(
                    'missing_template',
                    sprintf('Template file "%s" does not exist', $template_file)
                );
            }
        }

        return true;
    }

    /**
     * Validates theme assets
     *
     * @param array $assets Theme assets configuration.
     * @return bool|WP_Error Returns true if valid, WP_Error if invalid
     */
    public static function validate_theme_assets($assets) {
        if (!is_array($assets)) {
            return new WP_Error('invalid_assets', 'Theme assets must be an array');
        }

        // Check for required asset types
        $asset_types = array('css', 'js');
        
        foreach ($asset_types as $type) {
            if (isset($assets[$type])) {
                if (!is_array($assets[$type])) {
                    return new WP_Error(
                        'invalid_asset_type',
                        sprintf('Asset type "%s" must be an array', $type)
                    );
                }

                // Validate each asset file exists
                foreach ($assets[$type] as $file) {
                    if (!file_exists($file)) {
                        return new WP_Error(
                            'missing_asset',
                            sprintf('Asset file "%s" does not exist', $file)
                        );
                    }
                }
            }
        }

        return true;
    }
} 