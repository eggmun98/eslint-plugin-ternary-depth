/**
 * @fileoverview Rule to limit the depth of nested ternary expressions
 */
"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Limit the depth of nested ternary expressions",
      category: "Stylistic Issues",
      recommended: false,
      url: "https://github.com/eggmun98/eslint-plugin-ternary-depth"
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          maxDepth: {
            type: "integer",
            minimum: 1,
            default: 2
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      tooDeep: "Ternary expression nested too deeply (depth: {{depth}}). Maximum allowed depth is {{maxDepth}}."
    }
  },

  create: function(context) {
    const options = context.options[0] || {};
    const maxDepth = options.maxDepth || 2;
    
    function isTernary(node) {
      return node.type === "ConditionalExpression";
    }
    
    function calculateTernaryDepth(node, currentDepth = 0) {
      if (!node || !isTernary(node)) {
        return currentDepth;
      }
      
      const consequentDepth = calculateTernaryDepth(node.consequent, currentDepth + 1);
      const alternateDepth = calculateTernaryDepth(node.alternate, currentDepth + 1);
      
      return Math.max(consequentDepth, alternateDepth);
    }
    
    return {
      ConditionalExpression(node) {
        if (!isTernary(node.parent)) {
          const depth = calculateTernaryDepth(node);
          
          if (depth > maxDepth) {
            context.report({
              node,
              messageId: "tooDeep",
              data: {
                depth,
                maxDepth
              }
            });
          }
        }
      }
    };
  }
};